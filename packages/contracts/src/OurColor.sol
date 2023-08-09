// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {IOurColor} from "./interfaces/IOurColor.sol";
import {IZoraCreator1155} from "@zoralabs/zora-1155-contracts/interfaces/IZoraCreator1155.sol";
import {IZoraCreator1155Factory} from "@zoralabs/zora-1155-contracts/interfaces/IZoraCreator1155Factory.sol";
import {ZoraCreatorFixedPriceSaleStrategy} from "@zoralabs/zora-1155-contracts/minters/fixed-price/ZoraCreatorFixedPriceSaleStrategy.sol";
import {ICreatorRoyaltiesControl} from "@zoralabs/zora-1155-contracts/interfaces/ICreatorRoyaltiesControl.sol";
import {IMinter1155} from "@zoralabs/zora-1155-contracts/interfaces/IMinter1155.sol";

contract OurColor is IOurColor {
    bytes3[4] public initColors;

    IZoraCreator1155 public zora;
    ZoraCreatorFixedPriceSaleStrategy public saleStrategy;

    mapping(uint256 => bytes3) public colors;
    mapping(bytes3 => uint256) public colorToZoraTokenId;

    modifier beforeSetup() {
        require(address(zora) == address(0), "OurColor: already setup");
        _;
    }
    modifier afterSetup() {
        require(address(zora) != address(0), "OurColor: not setup");
        _;
    }

    constructor() {
        initColors = [
            bytes3(abi.encodePacked(uint8(0), uint8(0), uint8(0))),
            bytes3(abi.encodePacked(uint8(1), uint8(0), uint8(0))),
            bytes3(abi.encodePacked(uint8(0), uint8(1), uint8(0))),
            bytes3(abi.encodePacked(uint8(0), uint8(0), uint8(1)))
        ];
    }

    function setup(bytes memory data) external beforeSetup {
        if (data.length == 0) {
            revert();
        }
        (address _zora, address _saleStrategy) = abi.decode(
            data,
            (address, address)
        );

        zora = IZoraCreator1155(_zora);
        saleStrategy = ZoraCreatorFixedPriceSaleStrategy(_saleStrategy);

        if (
            !zora.isAdminOrRole(address(this), 0, zora.PERMISSION_BIT_MINTER())
        ) {
            revert("OurColor: cannot call ZoraCreator1155#setupNewToken");
        }

        _seedInitColors();
    }

    function generateNewColor(
        ColorUnit[] memory baseColors
    ) external afterSetup returns (uint256) {
        bytes3 newColor = _mixColors(baseColors);
        if (_isRegisteredColor(newColor)) {
            revert("OurColor: already registered");
        }

        _burnZoraBatch(msg.sender, baseColors);

        uint256 tokenId = _registerColor(newColor);

        return tokenId;
    }

    function _seedInitColors() private {
        for (uint256 i = 0; i < initColors.length; i++) {
            bytes3 color = initColors[i];
            _registerColor(color);
        }
    }

    function _registerColor(bytes3 color) private returns (uint256) {
        if (_isRegisteredColor(color)) {
            revert("OurColor: color already registered");
        }

        uint256 tokenId = zora.setupNewToken("", type(uint256).max);
        if (tokenId == 0) {
            revert("OurColor: failed to setup new token");
        }

        zora.addPermission(
            tokenId,
            address(saleStrategy),
            zora.PERMISSION_BIT_MINTER()
        );
        zora.callSale(
            tokenId,
            saleStrategy,
            abi.encodeWithSelector(
                ZoraCreatorFixedPriceSaleStrategy.setSale.selector,
                tokenId,
                ZoraCreatorFixedPriceSaleStrategy.SalesConfig({
                    pricePerToken: 0,
                    saleStart: 0,
                    saleEnd: type(uint64).max,
                    maxTokensPerAddress: 0,
                    fundsRecipient: address(0) //TODO: set to funding address
                })
            )
        );

        colors[tokenId] = color;

        return tokenId;
    }

    function _isRegisteredColor(bytes3 color) private view returns (bool) {
        return colorToZoraTokenId[color] != 0;
    }

    function _mixColors(
        ColorUnit[] memory baseColors
    ) private view returns (bytes3) {
        uint8 r = 0;
        uint8 g = 0;
        uint8 b = 0;

        for (uint256 i = 0; i < baseColors.length; i++) {
            ColorUnit memory baseColor = baseColors[i];
            bytes3 color = colors[baseColor.tokenId];
            r += uint8(color[0]) * uint8(baseColor.amount);
            g += uint8(color[1]) * uint8(baseColor.amount);
            b += uint8(color[2]) * uint8(baseColor.amount);
        }

        return bytes3(abi.encodePacked(r, g, b));
    }

    function _burnZoraBatch(address from, ColorUnit[] memory targets) private {
        uint256[] memory ids = new uint256[](targets.length);
        uint256[] memory amounts = new uint256[](targets.length);

        for (uint256 i = 0; i < targets.length; i++) {
            ColorUnit memory target = targets[i];
            ids[i] = target.tokenId;
            amounts[i] = target.amount;
        }

        zora.burnBatch(from, ids, amounts);
    }
}
