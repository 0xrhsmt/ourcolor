// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {IERC165} from "@openzeppelin/contracts/interfaces/IERC165.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";
import {IRenderer1155} from "@zoralabs/zora-1155-contracts/interfaces/IRenderer1155.sol";

import {IOurColor} from "./interfaces/IOurColor.sol";

contract OurColorRenderer is IRenderer1155 {
    IOurColor public ourColor;

    string public contractName;
    string public contractDescription;

    function uri(uint256 id) external pure returns (string memory) {
        string memory image = generateSVGImage(id);

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
        string memory image = generateSVGImage(0);

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

    function generateSVGImage(uint256) public pure returns (string memory svg) {
        // TODO: colorize the image based on the id

        // prettier-ignore
        return
            Base64.encode(
                bytes(
                    abi.encodePacked(
                        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">',
                        '<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />',
                        "</svg>"
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
