// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";

import {ZoraCreator1155Impl} from "@zoralabs/zora-1155-contracts/nft/ZoraCreator1155Impl.sol";
import {ZoraCreatorFixedPriceSaleStrategy} from "@zoralabs/zora-1155-contracts/minters/fixed-price/ZoraCreatorFixedPriceSaleStrategy.sol";

import {OurColor} from "../contracts/OurColor.sol";
import {OurColorRenderer} from "../contracts/OurColorRenderer.sol";

contract OurColorRendererTest is Test {
    OurColorRenderer public renderer;

    function setUp() public {
        renderer = new OurColorRenderer();
    }

    function test_generateSVGImage_renderBlack() public view {
        OurColor.RGBColor memory color = OurColor.RGBColor(0, 0, 0);

        string memory result = renderer.generateSVGImage(color);

        console2.log(result);
    }

    function test_encodeColor_EncodeWhiteColor() public view {
        OurColor.RGBColor memory color = OurColor.RGBColor(255, 255, 255);

        string memory result = renderer.generateSVGImage(color);

        console2.log(result);
    }

    function test_encodeColor_EncodeGreenColor() public view {
        OurColor.RGBColor memory color = OurColor.RGBColor(0, 255, 0);

        string memory result = renderer.generateSVGImage(color);

        console2.log(result);
    }
}
