import { parseAbiItem } from 'viem';

export const ColorRegisteredEventAbi = parseAbiItem(
  'event ColorRegistered(address indexed registerer, uint256 tokenId, (uint8 red, uint8 green, uint8 blue) color)'
);
