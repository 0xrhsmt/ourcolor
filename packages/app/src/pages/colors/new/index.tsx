import React from 'react';
import { ZORA_REWARDS_DOCS_URL } from '../../../constants';
import { PlusSmallIcon } from '@heroicons/react/24/solid';

const NewPage: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-2 h-screen">
        <div className="h-full overflow-auto">
          <div className="p-4">領域1</div>
        </div>

        <div className="h-full overflow-auto">
          <div className="flex justify-center flex-row">
            <div className="w-10/12 max-w-[400px] py-[150px]">
              <h3 className="text-3xl font-bold mb-8">New Color</h3>

              <div>
                <form>
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

                  <div className="flex flex-col mb-6 space-y-2">
                    <div className="flex flex-row space-x-4">
                      <div className="w-full">
                        <label className="label">
                          <span className="label-text">base colors</span>
                        </label>
                        <select className="select select-bordered select-lg w-full">
                          <option disabled selected>
                            rgb (1,2,3)
                          </option>
                          <option>Large Apple</option>
                          <option>Large Orange</option>
                          <option>Large Tomato</option>
                        </select>
                      </div>

                      <div className="w-full max-w-[100px]">
                        <label className="label">
                          <span className="label-text">quantity</span>
                        </label>
                        <input
                          type="text"
                          maxLength={3}
                          className="input input-bordered input-lg w-full text-center max-w-[100px]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row justify-center items-center">
                    <button className="btn btn-ghost">
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
