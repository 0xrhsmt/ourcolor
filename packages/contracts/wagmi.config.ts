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
          999: "0x15ED1EADcd2589225170cB508CA34e76743BB65D",
        },
        OurColor: {
          999: "0xedCf6423CA2aF87e3216187e103e30977C4Ce753",
        },
        OurColorRenderer: {
          999: "0xbD2c0273A1A4Df42C82Aa33355C00aA67cCf997f",
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
