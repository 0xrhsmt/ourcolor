import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { PlusSmallIcon } from '@heroicons/react/24/solid';
import {} from 'contracts';

import { ZORA_REWARDS_DOCS_URL } from '../../../constants';

type FormValues = {
  colors: {
    tokenId: number;
    quantity: number;
  }[];
};

const NewPage: React.FC = () => {
  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      colors: [
        {
          tokenId: 0,
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

  return (
    <div>
      <div className="grid grid-cols-2 h-screen">
        <div className="h-full overflow-auto">
          <div className="p-4"></div>
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
                    {fields.map((field, index) => {
                      return (
                        <div key={field.id}>
                          <div className="flex flex-row">
                            <div className="w-full">
                              <label className="label">
                                <span className="label-text">base colors</span>
                              </label>

                              <select
                                className="select select-bordered select-lg w-full"
                                {...register(
                                  `colors.${index}.tokenId` as const,
                                  {
                                    required: true,
                                  }
                                )}
                              >
                                <option value={0} selected>
                                  rgb (0,0,0)
                                </option>
                                <option value={1}>rgb (1,0,0)</option>
                                <option value={2}>rgb (0,1,0)</option>
                                <option value={3}>rgb (0,0,1)</option>
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
                                {...register(
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
                              onClick={() => remove(index)}
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
                        append({
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
