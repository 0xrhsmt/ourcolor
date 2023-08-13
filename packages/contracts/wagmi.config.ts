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
          999: "0xf7610FBBA140D54F40a93E58462A9debf30E83fb",
        },
        OurColor: {
          999: "0x3e377835feffDC251CEa6e2Acb8A84B8b66A8F5a",
        },
        OurColorRenderer: {
          999: "0x423C9E9811a4bFf1182aFbD88e253d63cFcF82F6",
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
