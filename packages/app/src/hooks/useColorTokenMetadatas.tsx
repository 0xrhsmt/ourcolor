import { useCallback, useEffect, useState } from 'react';
import { usePublicClient } from 'wagmi';
import { getAddress, Address } from 'viem';
import useOurColorAddresses from './useOurColorAddresses';
import { ColorRegisteredEventAbi } from '../config/abis';

type RGBValue = {
  red: number;
  green: number;
  blue: number;
};

type ColorMetadata = {
  creatorAddress: Address;
  color: RGBValue;
  tokenId: string;
};

export const useColorTokenMetadatas = () => {
  const publicClient = usePublicClient();
  const { OurColor: OurColorAddress } = useOurColorAddresses();

  const [colorMetadatas, setColorMetadatas] = useState<ColorMetadata[]>([]);

  const fetchColors = useCallback(async () => {
    if (OurColorAddress === undefined) {
      setColorMetadatas([]);
      return;
    }

    const logs = await publicClient.getLogs({
      fromBlock: BigInt(0),
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

export default useColorTokenMetadatas;
