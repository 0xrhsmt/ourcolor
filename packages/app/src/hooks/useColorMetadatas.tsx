import { useCallback, useEffect, useState } from 'react';
import { useNetwork, usePublicClient } from 'wagmi';
import { getAddress, parseAbiItem, Address } from 'viem';
import { zoraTestnet } from 'wagmi/chains';

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

const ColorCreatedEventAbi = parseAbiItem(
  'event ColorCreated(address indexed creator, bytes3 color, uint256 tokenId)'
);

export const addresses = {
  [zoraTestnet.id]: {
    OurZora: getAddress(
      '0x7e8091557a54287CFFBEcC0B0D48f16B83E12F9b',
      zoraTestnet.id
    ),
  },
};

export type SupportChains = keyof typeof addresses;

export const useColorMetadatas = () => {
  const { chain } = useNetwork();
  const publicClient = usePublicClient();

  const [colorMetadatas, setColorMetadatas] = useState<ColorMetadata[]>([]);

  const fetchColors = useCallback(async () => {
    if (chain?.id === undefined) {
      setColorMetadatas([]);
      return;
    }

    const logs = await publicClient.getLogs({
      fromBlock: BigInt(0),
      toBlock: 'latest',
      address: addresses[chain.id as SupportChains].OurZora,
      event: ColorCreatedEventAbi,
    });

    const newColors = logs.map((log) => {
      const creatorAddress = getAddress(log.args.creator!);
      const tokenId = log.args.tokenId!.toString();
      const colorHex = log.args.color!;

      const color = {
        red: parseInt(colorHex.slice(2, 4), 16),
        green: parseInt(colorHex.slice(4, 6), 16),
        blue: parseInt(colorHex.slice(6, 8), 16),
      };

      return {
        creatorAddress,
        tokenId,
        color,
      };
    });

    setColorMetadatas(newColors);
  }, [chain?.id, publicClient]);

  useEffect(() => {
    fetchColors();
  }, [chain?.id, fetchColors]);

  return { colorMetadatas };
};
