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
          999: "0x7589367EC8c76059cE7fB47515a59BCa80B59Af9",
        },
        OurColor: {
          999: "0xF4F3601160F6E79ce71a901c5470Cf35638676A5",
        },
        OurColorRenderer: {
          999: "0xACbDE603E819e08a2c00f438726925286104D916",
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
