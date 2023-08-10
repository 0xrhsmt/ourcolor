// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IOurColor {
    struct ColorUnit {
        uint256 tokenId;
        uint256 amount;
    }

    event TransferSingle(
        address indexed _operator,
        address indexed _from,
        address indexed _to,
        uint256 _id,
        uint256 _value
    );

    function colors(uint256 index) external view returns (bytes3);

    function colorToZoraTokenId(bytes3 color) external view returns (uint256);

    function setup(bytes memory initData) external;

    function createNewColor(
        ColorUnit[] memory baseColors
    ) external returns (uint256);
}
