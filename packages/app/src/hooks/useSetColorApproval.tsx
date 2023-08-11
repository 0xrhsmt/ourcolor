import { useMemo } from 'react';
import {
  usePrepareZoraCreator1155ImplSetApprovalForAll,
  useZoraCreator1155ImplSetApprovalForAll,
} from '../../../contracts/src';
import { SupportChains, addresses } from './useColorMetadatas';
import { useNetwork } from 'wagmi';

export const useSetColorApproval = (approve: boolean) => {
  const { chain } = useNetwork();
  const ourZora = useMemo(
    () => (chain ? addresses[chain.id as SupportChains].OurZora : undefined),
    [chain]
  );

  const { config } = usePrepareZoraCreator1155ImplSetApprovalForAll({
    enabled: ourZora !== undefined,
    args: [ourZora, approve],
  });
  const { write } = useZoraCreator1155ImplSetApprovalForAll(config);

  return {
    setApproval: write,
  };
};

export default useSetColorApproval;
