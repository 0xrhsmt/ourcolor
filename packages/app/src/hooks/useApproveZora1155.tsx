import {
  useZoraCreator1155ImplIsApprovedForAll,
  usePrepareZoraCreator1155ImplSetApprovalForAll,
  useZoraCreator1155ImplSetApprovalForAll,
} from 'contracts';
import useOurColorAddresses from './useOurColorAddresses';

export const useApproveZora1155 = (user: `0x${string}` | undefined) => {
  const { Zora1155Contract } = useOurColorAddresses();

  const { data: isApprovedForAll } = useZoraCreator1155ImplIsApprovedForAll({
    enabled: user !== undefined && Zora1155Contract !== undefined,
    args: [user!, Zora1155Contract!],
  });

  const { config } = usePrepareZoraCreator1155ImplSetApprovalForAll({
    enabled: Zora1155Contract !== undefined,
    args: [Zora1155Contract!, true],
  });
  const { write: setApprovalForAll } =
    useZoraCreator1155ImplSetApprovalForAll(config);

  return {
    isApprovedForAll,
    setApprovalForAll,
  };
};

export default useApproveZora1155;
