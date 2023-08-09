// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Script.sol";

import {ScriptDeploymentConfig} from "@zoralabs/zora-1155-contracts/deployment/DeploymentConfig.sol";
import {IZoraCreator1155Factory} from "@zoralabs/zora-1155-contracts/interfaces/IZoraCreator1155Factory.sol";
import {ICreatorRoyaltiesControl} from "@zoralabs/zora-1155-contracts/interfaces/ICreatorRoyaltiesControl.sol";
import {ZoraCreator1155Impl} from "@zoralabs/zora-1155-contracts/nft/ZoraCreator1155Impl.sol";

import {OurColor} from "../src/OurColor.sol";
import {OurColorRenderer} from "../src/OurColorRenderer.sol";

contract DeployScript is ScriptDeploymentConfig {
    function setUp() public {}

    function run() public {
        uint256 deployerKey = vm.envUint("DEPLOYER_KEY");
        address deployer = vm.addr(deployerKey);
        address factoryAddress = getDeployment().factoryProxy;
        address saleStrategy = getDeployment().fixedPriceSaleStrategy;
        IZoraCreator1155Factory factory = IZoraCreator1155Factory(
            factoryAddress
        );

        vm.startBroadcast(deployerKey);

        // deploy OurColor
        OurColor ourColor = new OurColor();

        // deploy OurColorRenderer and setup
        OurColorRenderer ourColorRenderer = new OurColorRenderer();
        bytes memory initRendererData = abi.encode(
            address(ourColor),
            "test name",
            "test description"
        );
        ourColorRenderer.setup(initRendererData);

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
            2
        );

        address zora = factory.createContract(
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
        bytes memory initOurColorData = abi.encode(
            address(zora),
            address(saleStrategy)
        );
        ourColor.setup(initOurColorData);

        console2.log("zora", zora);

        vm.stopBroadcast();
    }
}
