import React, { useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { PlusSmallIcon } from '@heroicons/react/24/solid';
import { waitForTransaction } from '@wagmi/core';
import { useNavigate } from 'react-router-dom';

import { ZORA_REWARDS_DOCS_URL } from '../../../constants';
import { useZora1155Metadatas } from '../../../hooks/useZora1155Metadatas';
import {
  useOurColorCreateNewColor,
  useOurColorRendererGenerateSvgImage,
  usePrepareOurColorCreateNewColor,
} from 'contracts';
import { useAccount } from 'wagmi';
import useApproveZora1155 from '../../../hooks/useApproveZora1155';

type FormValues = {
  colors: {
    tokenId: string;
    quantity: number;
  }[];
};

const useColorForm = () => {
  const { control, watch, register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      colors: [
        {
          tokenId: '2',
          quantity: 0,
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'colors',
    control,
  });

  return {
    colorFields: fields,
    watch,
    registerField: register,
    appendColorField: append,
    removeColorField: remove,
    handleSubmit,
  };
};

const NewPage: React.FC = () => {
  const navigate = useNavigate();

  const { address } = useAccount();
  const { isApprovedForAll, setApprovalForAll } = useApproveZora1155(address);

  const { colorMetadatas } = useZora1155Metadatas();

  const {
    colorFields,
    watch,
    registerField,
    appendColorField,
    removeColorField,
    handleSubmit,
  } = useColorForm();

  const colorInputs = watch('colors');
  const colorValues = colorInputs
    .map((input) => {
      const metadata = colorMetadatas.find((c) => c.tokenId === input.tokenId);
      if (!metadata) return;

      return {
        quantity: input.quantity,
        color: metadata.color,
      };
    })
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  const blendColor = colorValues.reduce(
    (acc, cur) => {
      acc.red += cur.quantity * cur.color.red;
      acc.green += cur.quantity * cur.color.green;
      acc.blue += cur.quantity * cur.color.blue;

      return acc;
    },
    { red: 0, green: 0, blue: 0 }
  );

  const { data: currentColorSVG } = useOurColorRendererGenerateSvgImage({
    args: [
      {
        red: blendColor.red,
        green: blendColor.green,
        blue: blendColor.blue,
      },
    ],
  });

  const { config } = usePrepareOurColorCreateNewColor({
    enabled: isApprovedForAll && colorInputs.length > 0,
    args: [
      colorInputs.map((c) => ({
        tokenId: BigInt(c.tokenId),
        amount: BigInt(c.quantity),
      })),
    ],
  });
  const { writeAsync: createNewColor } = useOurColorCreateNewColor(config);

  const onSubmit = useCallback(async () => {
    if (!createNewColor) return;

    const tx = await createNewColor();

    const result = await waitForTransaction(tx);
    if (result.status === 'success') {
      navigate('/colors');
    } else {
      console.error(result);
      alert('Something went wrong');
    }
  }, [createNewColor, navigate]);

  return (
    <div>
      <div className="grid grid-cols-2 h-screen">
        <div className="relative h-full overflow-auto bg-[#0000000d]">
          <div className="flex justify-center items-center h-full p-16">
            {currentColorSVG && (
              <div className="max-h-[660px]">
                <img src={`data:image/svg+xml;base64,${currentColorSVG}`} />
              </div>
            )}
          </div>
        </div>

        <div className="h-full overflow-auto">
          <div className="flex justify-center flex-row">
            <div className="w-10/12 max-w-[400px] py-[150px]">
              <h3 className="text-3xl font-bold mb-8">New Color</h3>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="font-light mb-6">
                    Mix your colors and create a new color.
                    <br />
                    To be more precise, burn your color tokens and create a new
                    type of color token.
                    <br />
                    When the color you create is minted, you&apos;ll be eligible
                    to receive a portion of{' '}
                    <a
                      className="link"
                      target="_blank"
                      href={ZORA_REWARDS_DOCS_URL}
                      rel="noopener noreferrer"
                    >
                      the protocol rewards
                    </a>
                    .
                  </div>

                  <div className="flex flex-col mb-2 space-y-2">
                    {colorFields.map((field, index) => {
                      return (
                        <div key={field.id}>
                          <div className="flex flex-row">
                            <div className="w-full">
                              <label className="label">
                                <span className="label-text">base colors</span>
                              </label>

                              <select
                                className="select select-bordered select-lg w-full"
                                {...registerField(
                                  `colors.${index}.tokenId` as const,
                                  {
                                    required: true,
                                  }
                                )}
                              >
                                {colorMetadatas
                                  .filter((c) => c.tokenId !== '1')
                                  .map((c) => (
                                    <option key={c.tokenId} value={c.tokenId}>
                                      {`rgb (${c.color.red},${c.color.green},${c.color.blue})`}
                                    </option>
                                  ))}
                              </select>
                            </div>

                            <div className="w-full max-w-[100px] ml-4">
                              <label className="label">
                                <span className="label-text">quantity</span>
                              </label>

                              <input
                                type="text"
                                maxLength={3}
                                className="input input-bordered input-lg w-full text-center max-w-[100px]"
                                {...registerField(
                                  `colors.${index}.quantity` as const,
                                  {
                                    valueAsNumber: true,
                                    required: true,
                                  }
                                )}
                              />
                            </div>
                          </div>
                          <div className="flex justify-end mt-1.5">
                            <button
                              type="button"
                              className="btn btn-link btn-sm pr-0"
                              onClick={() => removeColorField(index)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-row justify-center items-center">
                    <button
                      className="btn btn-ghost"
                      onClick={() =>
                        appendColorField({
                          tokenId: '2',
                          quantity: 0,
                        })
                      }
                    >
                      <PlusSmallIcon height={24} width={24} />
                      Add Color
                    </button>
                  </div>

                  <div className="mt-8">
                    {isApprovedForAll ? (
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg w-full "
                      >
                        Mix Colors
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary btn-lg w-full"
                        onClick={setApprovalForAll}
                      >
                        Allow burning color tokens
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPage;
