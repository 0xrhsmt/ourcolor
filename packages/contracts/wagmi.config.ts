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
          999: "0x7438724e1e144847f5cFb6A82eFbCB0c9A3Be7Ce",
        },
        OurColor: {
          999: "0x7e8091557a54287CFFBEcC0B0D48f16B83E12F9b",
        },
        OurColorRenderer: {
          999: "0xceEc4C1cF19696226145b14e7768abC32e1031d0",
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
