// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

library ToHex {
    function bytes3ToHexString(
        bytes3 data
    ) public pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(6);
        for (uint i = 0; i < 3; i++) {
            str[i * 2] = alphabet[uint(uint8(data[i] >> 4))];
            str[1 + i * 2] = alphabet[uint(uint8(data[i] & 0x0f))];
        }

        return string(str);
    }
}
