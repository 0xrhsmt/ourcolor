// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

library Uint8ToHexLib {
    function toHexStr(uint8 value) internal pure returns (string memory) {
        bytes memory byteArray = new bytes(2);
        for (uint8 i = 0; i < 2; i++) {
            uint8 b = uint8(value & 0xF);
            value >>= 4;
            byteArray[1 - i] = b < 10
                ? bytes1(uint8(b + 48))
                : bytes1(uint8(b + 87));
        }
        return string(byteArray);
    }
}
