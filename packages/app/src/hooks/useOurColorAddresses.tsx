import { useMemo } from 'react';
import { useNetwork } from 'wagmi';
import { Addresses } from '../config/addresses';
import { SupportChainIdType } from '../config/supportChains';

export const useOurColorAddresses = () => {
  const { chain } = useNetwork();

  const addresses = useMemo(
    () =>
      chain
        ? Addresses[chain.id as SupportChainIdType]
        : {
            OurColor: undefined,
            OurColorRenderer: undefined,
            Zora1155Contract: undefined,
          },
    [chain]
  );

  return addresses;
};

export default useOurColorAddresses;
