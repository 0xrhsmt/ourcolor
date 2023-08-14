import { useCallback, useEffect, useState } from 'react';
import { useNetwork, usePublicClient } from 'wagmi';
import { getAddress, Address } from 'viem';
import useOurColorAddresses from './useOurColorAddresses';
import { ColorRegisteredEventAbi } from '../config/abis';
import { baseGoerli } from 'wagmi/chains';

export type RGBValue = {
  red: number;
  green: number;
  blue: number;
};

export type ColorMetadata = {
  creatorAddress: Address;
  color: RGBValue;
  tokenId: string;
};

export const useZora1155Metadatas = () => {
  const { chain } = useNetwork();
  const publicClient = usePublicClient();
  const { OurColor: OurColorAddress } = useOurColorAddresses();

  const [colorMetadatas, setColorMetadatas] = useState<ColorMetadata[]>([]);

  const fetchColors = useCallback(async () => {
    if (OurColorAddress === undefined) {
      setColorMetadatas([]);
      return;
    }

    const logs = await publicClient.getLogs({
      fromBlock: chain.id === baseGoerli.id ? BigInt(8401210) : BigInt(0),
      toBlock: 'latest',
      address: OurColorAddress,
      event: ColorRegisteredEventAbi,
    });

    const newColors = logs.map((log) => {
      const creatorAddress = getAddress(log.args.registerer!);
      const tokenId = log.args.tokenId!.toString();
      const color = log.args.color!;

      return {
        creatorAddress,
        tokenId,
        color,
      };
    });

    setColorMetadatas(newColors);
  }, [OurColorAddress, publicClient]);

  useEffect(() => {
    fetchColors();
  }, [OurColorAddress, fetchColors]);

  return { colorMetadatas };
};

export default useZora1155Metadatas;
