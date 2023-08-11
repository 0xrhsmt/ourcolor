// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IOurColor {
    struct ColorUnit {
        uint256 tokenId;
        uint256 amount;
    }

    event ColorCreated(address indexed creator, bytes3 color, uint256 tokenId);

    function colors(uint256 tokenId) external view returns (bytes3);

    function colorToZoraTokenId(bytes3 color) external view returns (uint256);

    function setup(bytes memory initData) external;

    function createNewColor(
        ColorUnit[] memory baseColors
    ) external returns (uint256);
}
