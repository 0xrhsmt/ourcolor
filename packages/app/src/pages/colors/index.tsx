import React, { useMemo } from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { useAccount, useNetwork } from 'wagmi';
import { zoraTestnet, optimismGoerli, baseGoerli } from 'wagmi/chains';

import useZora1155Metadatas, {
  ColorMetadata,
} from '../../hooks/useZora1155Metadatas';
import { useOurColorRendererGenerateSvgImageFromTokenId } from 'contracts';
import useZora1155Balances from '../../hooks/useZora1155Balances';
import useOurColorAddresses from '../../hooks/useOurColorAddresses';
import { Link } from 'react-router-dom';

const networkPrefix = {
  [zoraTestnet.id]: 'zgor',
  [optimismGoerli.id]: 'ogor',
  [baseGoerli.id]: 'basegor',
};

const ColorCard: React.FC<{
  metadata: ColorMetadata;
  balance: bigint;
  urls:
    | { mintPage: string; addressPage: string; tokenPage: string }
    | undefined;
}> = ({ metadata, balance, urls }) => {
  const { data: colorSVG } = useOurColorRendererGenerateSvgImageFromTokenId({
    args: [BigInt(metadata.tokenId)],
  });

  return (
    <div className="card border w-[350px] bg-base-100 shadow-md">
      <figure className="p-8 bg-[#0000000d]">
        {colorSVG && (
          <img
            width={128}
            height={128}
            src={`data:image/svg+xml;base64,${colorSVG}`}
          />
        )}
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          <div className="flex flex-row justify-between items-center w-full">
            <div>{`rgb (${metadata.color.red}, ${metadata.color.green}, ${metadata.color.blue})`}</div>
            <div className="badge badge-lg font-normal">
              {balance.toString()} items
            </div>
          </div>
        </h2>

        <p className="truncate">
          creator:{' '}
          <a
            className="link"
            href={
              urls?.addressPage
                ? `${urls.addressPage}/${metadata.creatorAddress}`
                : ''
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${metadata.creatorAddress}`}
          </a>
        </p>
        <p>
          tokenId:{' '}
          <a
            className="link"
            href={
              urls?.tokenPage ? `${urls.tokenPage}/${metadata.tokenId}` : ''
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {metadata.tokenId}
          </a>
        </p>
        <div className="card-actions justify-end">
          <a
            className="btn btn-ghost"
            href={urls?.mintPage ? `${urls.mintPage}/${metadata.tokenId}` : ''}
            target="_blank"
            rel="noopener noreferrer"
          >
            Mint
            <ArrowTopRightOnSquareIcon height={20} width={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

const IndexPage: React.FC = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { colorMetadatas } = useZora1155Metadatas();
  const { Zora1155Contract } = useOurColorAddresses();

  const tokenIds = useMemo(
    () => colorMetadatas?.map((c) => c.tokenId) ?? [],
    [colorMetadatas]
  );

  const { balances } = useZora1155Balances(address, tokenIds);
  const urls = useMemo(() => {
    if (!chain?.id) return undefined;

    const network = networkPrefix[chain.id as keyof typeof networkPrefix];

    return {
      mintPage: `https://testnet.zora.co/collect/${network}:${Zora1155Contract}`,
      addressPage: `https://testnet.explorer.zora.energy/address`,
      tokenPage: `https://testnet.explorer.zora.energy/token/${Zora1155Contract}/instance`,
    };
  }, [chain?.id, Zora1155Contract]);

  return (
    <div className="py-[75px] max-w-[1560px] mx-auto">
      <div className="mt-[60x] p-8">
        <div className="flex flex-row justify-between">
          <h3 className="text-3xl font-bold mb-12">Collection</h3>
          <Link to="/colors/new">
            <button className="btn btn-primary">New Color</button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 justify-items-center	">
          {colorMetadatas.map((m) => {
            const balance = balances
              ? balances[Number(m.tokenId) - 1]
              : BigInt(0);

            return (
              <ColorCard
                key={m.tokenId}
                metadata={m}
                balance={balance}
                urls={urls}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
