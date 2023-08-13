import { Address } from 'viem';
import { zoraTestnet } from 'wagmi/chains';
import { SupportChainIdType } from './supportChains';
import {
  ourColorAddress,
  ourColorRendererAddress,
  zoraCreator1155ImplAddress,
} from 'contracts';

export type AddressConfig = {
  OurColor: Address;
  OurColorRenderer: Address;
  Zora1155Contract: Address;
};

export const Addresses = {
  [zoraTestnet.id]: {
    OurColor: ourColorAddress[zoraTestnet.id],
    OurColorRenderer: ourColorRendererAddress[zoraTestnet.id],
    Zora1155Contract: zoraCreator1155ImplAddress[zoraTestnet.id],
  },
} as {
  [chainId in SupportChainIdType]: AddressConfig;
};
