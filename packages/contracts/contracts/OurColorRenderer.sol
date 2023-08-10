// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {IERC165} from "@openzeppelin/contracts/interfaces/IERC165.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {IRenderer1155} from "@zoralabs/zora-1155-contracts/interfaces/IRenderer1155.sol";

import {IOurColor} from "./interfaces/IOurColor.sol";
import {ToHex} from "./utils/ToHex.sol";

contract OurColorRenderer is IRenderer1155 {
    using ToHex for bytes3;

    IOurColor public ourColor;

    string public contractName;
    string public contractDescription;

    function uri(uint256 id) external view returns (string memory) {
        string memory image = generateSVGImageFromTokenId(id);

        // prettier-ignore
        return string(
            abi.encodePacked(
                'data:application/json;base64,',
                Base64.encode(
                    bytes(
                        abi.encodePacked('{"name":"Our Color Token", "description":"Our Color Token", "image": "', 'data:image/svg+xml;base64,', image, '"}')
                    )
                )
            )
        );
    }

    function contractURI() external view returns (string memory) {
        string memory image = generateSVGImageFromTokenId(0);

        // prettier-ignore
        return string(
            abi.encodePacked(
                'data:application/json;base64,',
                Base64.encode(
                    bytes(
                        abi.encodePacked('{"name":"', contractName, '", "description":"', contractDescription, '", "image": "', 'data:image/svg+xml;base64,', image, '"}')
                    )
                )
            )
        );
    }

    function setup(bytes memory data) external override {
        if (data.length == 0) {
            revert();
        }
        (
            address _ourColor,
            string memory _contractName,
            string memory _contractDescription
        ) = abi.decode(data, (address, string, string));

        ourColor = IOurColor(_ourColor);
        contractName = _contractName;
        contractDescription = _contractDescription;
    }

    function generateSVGImageFromTokenId(
        uint256 tokenId
    ) public view returns (string memory svg) {
        bytes3 color = ourColor.colors(tokenId);

        return generateSVGImage(color);
    }

    function generateSVGImageFromRGB(
        uint8 r,
        uint8 g,
        uint8 b
    ) public pure returns (string memory svg) {
        bytes3 color = bytes3(abi.encodePacked(r, g, b));

        return generateSVGImage(color);
    }

    function generateSVGImage(
        bytes3 color
    ) public pure returns (string memory svg) {
        // prettier-ignore
        return
            Base64.encode(
                bytes(
                    abi.encodePacked(
                        '<svg width="661" height="661" viewBox="0 0 661 661" fill="none" xmlns="http://www.w3.org/2000/svg">',
                            '<path d="M4.6343 275.446C-25.4958 454.922 95.9687 625.397 275.445 655.527C454.921 685.657 625.396 564.192 655.526 384.716C685.49 205.212 564.026 34.7375 384.715 4.63523C205.239 -25.4949 34.7644 95.9696 4.6343 275.446Z" fill="url(#paint0_radial_1467_0)" />',
                            '<defs>',
                                '<radialGradient id="paint0_radial_1467_0" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(452.155 193.511) rotate(138.09) scale(529.332 529.332)">',
                                    '<stop offset="0.0267" stop-color="#FFFFFF" />',
                                    '<stop offset="0.35" stop-color="#',
                                        color.bytes3ToHexString(),
                                    '" />',
                                '</radialGradient>',
                            '</defs>',
                        '</svg>'
                    )
                )
            );
    }

    function supportsInterface(
        bytes4 interfaceID
    ) external pure returns (bool) {
        return interfaceID == type(IRenderer1155).interfaceId;
    }
}
