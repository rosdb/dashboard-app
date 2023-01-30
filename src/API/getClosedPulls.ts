import { RequestError } from '@octokit/types';

import type { Pull } from '~/Model/Pulls';

import { ENDPOINT, Params } from './endpoints';
import { Http } from './handleRequests';

export const getClosedPulls = async ({
  owner,
  repo
}: Params): Promise<Pull[]> => {
  try {
    const result = await Http.request(ENDPOINT.CLOSED_PULLS_LIST, {
      owner,
      repo
    });
    return result.data;
  } catch (err) {
    const error = err as RequestError;
    throw `Error! Status: ${error.status}.`;
  }
};
