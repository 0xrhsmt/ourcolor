// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";

import {ZoraCreator1155Impl} from "@zoralabs/zora-1155-contracts/nft/ZoraCreator1155Impl.sol";
import {ZoraCreatorFixedPriceSaleStrategy} from "@zoralabs/zora-1155-contracts/minters/fixed-price/ZoraCreatorFixedPriceSaleStrategy.sol";

import {OurColor} from "../contracts/OurColor.sol";

contract OurColorHarness is OurColor {
    function exposed_isRegisteredColor(
        RGBColor memory color
    ) external view returns (bool) {
        return _isRegisteredColor(color);
    }

    function exposed_encodeColor(
        RGBColor memory color
    ) external pure returns (bytes3) {
        return OurColor._encodeColor(color);
    }

    function exposed_blendColors(
        ColorBlend[] memory colorsToBlend
    ) external view returns (RGBColor memory) {
        return _blendColors(colorsToBlend);
    }
}

contract OurColorTest is Test {
    // OurColorHarness public ourColor;
    // function setUp() public {
    //     ourColor = new OurColorHarness(
    //         ZoraCreator1155Impl(address(0)),
    //         ZoraCreatorFixedPriceSaleStrategy(address(0))
    //     );
    // }
    // function test_isRegisteredColor_ColorNotRegistered() public {
    //     OurColor.RGBColor memory color = OurColor.RGBColor(0, 0, 0);
    //     bool result = ourColor.exposed_isRegisteredColor(color);
    //     assertFalse(result);
    // }
    // function test_encodeColor_EncodeBlackColor() public {
    //     OurColor.RGBColor memory color = OurColor.RGBColor(0, 0, 0);
    //     bytes3 result = ourColor.exposed_encodeColor(color);
    //     assertEq(result, bytes3(0x0));
    // }
    // function test_encodeColor_EncodeWhiteColor() public {
    //     OurColor.RGBColor memory color = OurColor.RGBColor(255, 255, 255);
    //     bytes3 result = ourColor.exposed_encodeColor(color);
    //     assertEq(result, bytes3(0xffffff));
    // }
    // function test_encodeColor_EncodeGreenColor() public {
    //     OurColor.RGBColor memory color = OurColor.RGBColor(0, 255, 0);
    //     bytes3 result = ourColor.exposed_encodeColor(color);
    //     assertEq(result, bytes3(0x00ff00));
    // }
    // function test_blendColors_BlendEmptyColors() public {
    //     OurColor.ColorBlend[] memory colorsToBlend = new OurColor.ColorBlend[](
    //         0
    //     );
    //     OurColor.RGBColor memory result = ourColor.exposed_blendColors(
    //         colorsToBlend
    //     );
    //     assertEq(result.red, 0);
    //     assertEq(result.green, 0);
    //     assertEq(result.blue, 0);
    // }
}
