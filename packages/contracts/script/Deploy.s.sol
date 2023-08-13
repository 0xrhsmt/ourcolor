// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Script.sol";

import {ScriptDeploymentConfig} from "@zoralabs/zora-1155-contracts/deployment/DeploymentConfig.sol";
import {IZoraCreator1155Factory} from "@zoralabs/zora-1155-contracts/interfaces/IZoraCreator1155Factory.sol";
import {ICreatorRoyaltiesControl} from "@zoralabs/zora-1155-contracts/interfaces/ICreatorRoyaltiesControl.sol";
import {IMinter1155} from "@zoralabs/zora-1155-contracts/interfaces/IMinter1155.sol";
import {ZoraCreator1155Impl} from "@zoralabs/zora-1155-contracts/nft/ZoraCreator1155Impl.sol";

import {OurColor} from "../contracts/OurColor.sol";
import {OurColorRenderer} from "../contracts/OurColorRenderer.sol";

contract DeployScript is ScriptDeploymentConfig {
    function setUp() public {}

    function run() public {
        uint256 deployerKey = vm.envUint("DEPLOYER_KEY");
        address deployer = vm.addr(deployerKey);

        vm.startBroadcast(deployerKey);

        // deploy OurColor
        OurColor ourColor = new OurColor();

        // deploy OurColorRenderer and setup
        OurColorRenderer ourColorRenderer = new OurColorRenderer();

        bytes memory initRenderer = abi.encode(
            address(ourColor),
            "test name",
            "test description"
        );
        ourColorRenderer.setup(initRenderer);

        // deploy ZoraCreator1155
        bytes[] memory setupActions = new bytes[](2);
        setupActions[0] = abi.encodeWithSelector(
            ZoraCreator1155Impl.setTokenMetadataRenderer.selector,
            0,
            address(ourColorRenderer)
        );
        setupActions[1] = abi.encodeWithSelector(
            ZoraCreator1155Impl.addPermission.selector,
            0,
            address(ourColor),
            2 // PERMISSION_BIT_ADMIN
        );

        address factoryAddress = getDeployment().factoryProxy;
        IZoraCreator1155Factory factory = IZoraCreator1155Factory(
            factoryAddress
        );
        address tokenContract = factory.createContract(
            "",
            "Our Color",
            ICreatorRoyaltiesControl.RoyaltyConfiguration({
                royaltyBPS: 0,
                royaltyMintSchedule: 0,
                royaltyRecipient: deployer
            }),
            payable(deployer),
            setupActions
        );

        // setup OurColor
        address saleStrategy = getDeployment().fixedPriceSaleStrategy;
        bytes memory initTokenContract = abi.encode(
            address(tokenContract),
            address(saleStrategy)
        );
        ourColor.setup(initTokenContract);

        console2.log("ZoraCreator1155Impl", tokenContract);
        console2.log("OurColor", address(ourColor));
        console2.log("OurColorRenderer", address(ourColorRenderer));

        ///////debug code/////////////////

        bytes memory minterArguments = abi.encode(
            address(deployer),
            "test comment"
        );
        ZoraCreator1155Impl(tokenContract).mint{value: 0.001554 ether}(
            IMinter1155(saleStrategy),
            2,
            2,
            minterArguments
        );
        ZoraCreator1155Impl(tokenContract).setApprovalForAll(
            address(ourColor),
            true
        );
        OurColor.ColorBlend[] memory colorsToBlend = new OurColor.ColorBlend[](
            1
        );
        colorsToBlend[0] = OurColor.ColorBlend({tokenId: 2, amount: 2});
        ourColor.createNewColor(colorsToBlend);
        ZoraCreator1155Impl(tokenContract).mint{value: 0.001554 ether}(
            IMinter1155(saleStrategy),
            5,
            2,
            minterArguments
        );

        vm.stopBroadcast();
    }
}
