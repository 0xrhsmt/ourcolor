import { Address } from 'viem';
import { zoraTestnet, optimismGoerli, baseGoerli } from 'wagmi/chains';
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
  [optimismGoerli.id]: {
    OurColor: ourColorAddress[optimismGoerli.id],
    OurColorRenderer: ourColorRendererAddress[optimismGoerli.id],
    Zora1155Contract: zoraCreator1155ImplAddress[optimismGoerli.id],
  },
  [baseGoerli.id]: {
    OurColor: ourColorAddress[baseGoerli.id],
    OurColorRenderer: ourColorRendererAddress[baseGoerli.id],
    Zora1155Contract: zoraCreator1155ImplAddress[baseGoerli.id],
  },
} as {
  [chainId in SupportChainIdType]: AddressConfig;
};
