import { useMemo } from 'react';
import { useZoraCreator1155ImplIsApprovedForAll } from '../../../contracts/src';
import { SupportChains, addresses } from './useColorMetadatas';
import { useNetwork } from 'wagmi';

export const useGetColorApproval = (address: `0x${string}` | undefined) => {
  const { chain } = useNetwork();
  const ourZora = useMemo(
    () => (chain ? addresses[chain.id as SupportChains].OurZora : undefined),
    [chain]
  );
  const { data: isApproved } = useZoraCreator1155ImplIsApprovedForAll({
    enabled: address !== undefined && ourZora !== undefined,
    args: [address, ourZora],
  });

  return {
    isApproved: isApproved,
  };
};

export default useGetColorApproval;
