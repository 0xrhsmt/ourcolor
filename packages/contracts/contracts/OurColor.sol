// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import {ZoraCreator1155Impl} from "@zoralabs/zora-1155-contracts/nft/ZoraCreator1155Impl.sol";
import {ZoraCreatorFixedPriceSaleStrategy} from "@zoralabs/zora-1155-contracts/minters/fixed-price/ZoraCreatorFixedPriceSaleStrategy.sol";

contract OurColor {
    struct RGBColor {
        uint8 red;
        uint8 green;
        uint8 blue;
    }

    struct ColorBlend {
        uint256 tokenId;
        uint256 amount;
    }

    event ColorRegistered(
        address indexed registerer,
        uint256 tokenId,
        RGBColor color
    );

    ZoraCreator1155Impl public zora1155;
    ZoraCreatorFixedPriceSaleStrategy public saleStrategy;

    mapping(uint256 => RGBColor) public colors;
    mapping(bytes3 => uint256) public colorToTokenId;

    function setup(bytes memory data) external {
        if (data.length == 0) {
            revert();
        }
        (address _zora1155, address _saleStrategy) = abi.decode(
            data,
            (address, address)
        );

        zora1155 = ZoraCreator1155Impl(_zora1155);
        saleStrategy = ZoraCreatorFixedPriceSaleStrategy(_saleStrategy);

        if (
            !zora1155.isAdminOrRole(
                address(this),
                0,
                zora1155.PERMISSION_BIT_MINTER()
            )
        ) {
            revert("OurColor: cannot call ZoraCreator1155#setupNewToken");
        }

        _registerSeedColors();
    }

    function createNewColor(
        ColorBlend[] memory colorsToBlend
    ) external returns (uint256) {
        address registerer = msg.sender;

        RGBColor memory newColor = _blendColors(colorsToBlend);
        if (_isRegisteredColor(newColor)) {
            revert("OurColor: already registered");
        }

        _burnTokensToBlend(registerer, colorsToBlend);

        uint256 tokenId = _registerColor(registerer, newColor);

        return tokenId;
    }

    function _blendColors(
        ColorBlend[] memory colorsToBlend
    ) internal view returns (RGBColor memory) {
        uint256 red = 0;
        uint256 green = 0;
        uint256 blue = 0;

        for (uint256 i = 0; i < colorsToBlend.length; i++) {
            ColorBlend memory colorBlend = colorsToBlend[i];
            RGBColor memory rgbColor = colors[colorBlend.tokenId];

            red += rgbColor.red * colorBlend.amount;
            green += rgbColor.green * colorBlend.amount;
            blue += rgbColor.blue * colorBlend.amount;
        }

        return
            RGBColor(
                red > 255 ? 255 : uint8(red),
                green > 255 ? 255 : uint8(green),
                blue > 255 ? 255 : uint8(blue)
            );
    }

    function _burnTokensToBlend(
        address registerer,
        ColorBlend[] memory colorsToBlend
    ) private {
        uint256[] memory ids = new uint256[](colorsToBlend.length);
        uint256[] memory amounts = new uint256[](colorsToBlend.length);

        for (uint256 i = 0; i < colorsToBlend.length; i++) {
            ColorBlend memory color = colorsToBlend[i];
            ids[i] = color.tokenId;
            amounts[i] = color.amount;
        }

        zora1155.burnBatch(registerer, ids, amounts);
    }

    function _registerSeedColors() internal {
        address registerer = msg.sender;

        _registerColor(registerer, RGBColor(0, 0, 0)); // black
        _registerColor(registerer, RGBColor(1, 0, 0)); // red origin
        _registerColor(registerer, RGBColor(0, 1, 0)); // green origin
        _registerColor(registerer, RGBColor(0, 0, 1)); // blue origin
    }

    function _registerColor(
        address registerer,
        RGBColor memory color
    ) internal returns (uint256) {
        uint256 tokenId = _registerColorForZora1155(registerer, color);

        colors[tokenId] = color;
        colorToTokenId[_encodeColor(color)] = tokenId;

        emit ColorRegistered(registerer, tokenId, color);

        return tokenId;
    }

    function _registerColorForZora1155(
        address registerer,
        RGBColor memory color
    ) internal returns (uint256) {
        if (_isRegisteredColor(color)) {
            revert("OurColor: color already registered");
        }

        uint256 tokenId = zora1155.setupNewTokenWithCreateReferral(
            "",
            type(uint256).max,
            registerer
        );
        if (tokenId == 0) {
            revert("OurColor: failed to setup new token");
        }

        zora1155.addPermission(
            tokenId,
            address(saleStrategy),
            zora1155.PERMISSION_BIT_MINTER()
        );
        zora1155.callSale(
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

        return tokenId;
    }

    function _isRegisteredColor(
        RGBColor memory color
    ) internal view returns (bool) {
        return colorToTokenId[_encodeColor(color)] != 0;
    }

    function _encodeColor(
        RGBColor memory color
    ) internal pure returns (bytes3) {
        return bytes3(abi.encodePacked(color.red, color.green, color.blue));
    }
}
