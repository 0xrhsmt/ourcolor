import { useMemo } from 'react';
import { useZoraCreator1155ImplBalanceOfBatch } from 'contracts';

export const useColorTokenBalances = (
  address: `0x${string}` | undefined,
  tokenIds: string[]
) => {
  const accounts = useMemo(
    () => Array(tokenIds.length).fill(address),
    [address, tokenIds.length]
  );
  const { data } = useZoraCreator1155ImplBalanceOfBatch({
    enabled: address !== undefined && tokenIds?.length > 0,
    args: [accounts, tokenIds.map((t) => BigInt(t))],
  });

  return {
    balances: data,
  };
};

export default useColorTokenBalances;
