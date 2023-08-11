import React, { useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { PlusSmallIcon } from '@heroicons/react/24/solid';

import { ZORA_REWARDS_DOCS_URL } from '../../../constants';
import { useColorMetadatas } from '../../../hooks/useColorMetadatas';
import { useOurColorRendererGenerateSvgImageFromRgb } from '../../../../../contracts/src';
import { useAccount } from 'wagmi';
import useColorBalances from '../../../hooks/useColorBalance';
import useColorIsApprovedForAll from '../../../hooks/useColorIsApprovedForAll';

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
  const onSubmit = (data: FormValues) => console.log(data);

  return {
    colorFields: fields,
    watch,
    registerField: register,
    appendColorField: append,
    removeColorField: remove,
    onSubmit: handleSubmit(onSubmit),
  };
};

const NewPage: React.FC = () => {
  const { address } = useAccount();
  const { colorMetadatas } = useColorMetadatas();
  const tokenIds = useMemo(
    () => colorMetadatas?.map((c) => c.tokenId) ?? [],
    [colorMetadatas]
  );

  // TODO: use these hooks
  useColorBalances(address, tokenIds);
  useColorIsApprovedForAll(address);

  const {
    colorFields,
    watch,
    registerField,
    appendColorField,
    removeColorField,
    onSubmit,
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

  const mixedColor = colorValues.reduce(
    (acc, cur) => {
      acc.red += cur.quantity * cur.color.red;
      acc.blue += cur.quantity * cur.color.blue;
      acc.green += cur.quantity * cur.color.green;

      return acc;
    },
    { red: 0, blue: 0, green: 0 }
  );

  const { data: currentColorSVG } = useOurColorRendererGenerateSvgImageFromRgb({
    args: [mixedColor.red, mixedColor.blue, mixedColor.green],
  });

  return (
    <div>
      <div className="grid grid-cols-2 h-screen">
        <div
          className="relative h-full overflow-auto"
          style={{
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.6) -1%, rgba(0, 0, 0, 0) 47%, rgba(0, 0, 0, 0.6) 100%)',
          }}
        >
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
                <form onSubmit={onSubmit}>
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
                          tokenId: 0,
                          quantity: 0,
                        })
                      }
                    >
                      <PlusSmallIcon height={24} width={24} />
                      Add Color
                    </button>
                  </div>
                </form>

                <div className="mt-8">
                  <button className="btn btn-primary btn-lg w-full ">
                    Mix Colors
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPage;
