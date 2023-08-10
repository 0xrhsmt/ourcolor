import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { zoraTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import React from 'react';


const { chains, publicClient } = configureChains(
  [zoraTestnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit demo',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});


export const NetworkConfigProvider = ({ children }: { children: React.ReactNode }) => (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
      {children}
      </RainbowKitProvider>
    </WagmiConfig>
);

export default NetworkConfigProvider;