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
          999: "0x5de01F75deCF8364dBca7B7d75bE116389638716",
        },
        OurColor: {
          999: "0x2b7064E9674d767Cd7eFd4aEB150b493F03a4621",
        },
        OurColorRenderer: {
          999: "0x8E1e088eD7049B2Ff43AD89D6d443fD066826315",
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
