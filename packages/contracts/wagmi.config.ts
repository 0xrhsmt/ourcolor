import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/generated.ts",
  plugins: [
    foundry({
      forge: {
        clean: true,
        build: true,
        rebuild: true,
      },
      deployments: {
        ZoraCreator1155Impl: {
          420: "0x5d5842Dca853CE21aA16B0f822Fd09Fd81446B13",
          999: "0x7589367EC8c76059cE7fB47515a59BCa80B59Af9",
          84531: "0x787DdFB44A4A95cE77119e15DcccCa6B4528031B",
        },
        OurColor: {
          420: "0x3490bE6eb72130f009E055A861dbdE9969E5FC22",
          999: "0xF4F3601160F6E79ce71a901c5470Cf35638676A5",
          84531: "0x969eF78D40E6b0D1daaa193057dC17ba428c6F15",
        },
        OurColorRenderer: {
          420: "0xE44D6Ef307750ab28eB20ccEeF907EA3f57517ED",
          999: "0xACbDE603E819e08a2c00f438726925286104D916",
          84531: "0x520Ca50F713f657D1F2F40d80faE22B39c18A19d",
        },
      },
      include: [
        "ZoraCreator1155Impl.sol/**",
        "OurColor.sol/**",
        "OurColorRenderer.sol/**",
      ],
    }),
    react(),
  ],
});
