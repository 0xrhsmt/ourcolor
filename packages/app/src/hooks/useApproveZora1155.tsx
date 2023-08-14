import {
  useZoraCreator1155ImplIsApprovedForAll,
  usePrepareZoraCreator1155ImplSetApprovalForAll,
  useZoraCreator1155ImplSetApprovalForAll,
} from 'contracts';
import useOurColorAddresses from './useOurColorAddresses';

export const useApproveZora1155 = (user: `0x${string}` | undefined) => {
  const { OurColor } = useOurColorAddresses();

  const { data: isApprovedForAll } = useZoraCreator1155ImplIsApprovedForAll({
    enabled: user !== undefined && OurColor !== undefined,
    args: [user!, OurColor!],
  });

  const { config } = usePrepareZoraCreator1155ImplSetApprovalForAll({
    enabled: OurColor !== undefined,
    args: [OurColor!, true],
  });
  const { write: setApprovalForAll } =
    useZoraCreator1155ImplSetApprovalForAll(config);

  return {
    isApprovedForAll,
    setApprovalForAll,
  };
};

export default useApproveZora1155;
