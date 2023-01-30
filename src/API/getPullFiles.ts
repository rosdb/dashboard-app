import { RequestError } from '@octokit/types';

import type { PullFiles } from '~/Model/PullFiles';

import { ENDPOINT, ParamsWithPullFiles } from './endpoints';
import { Http } from './handleRequests';

export const getPullFiles = async ({
  owner,
  repo,
  pull_number
}: ParamsWithPullFiles): Promise<PullFiles[]> => {
  try {
    const result = await Http.request(ENDPOINT.PULL_FILES, {
      owner,
      repo,
      pull_number
    });
    return result.data;
  } catch (err) {
    const error = err as RequestError;
    throw `Error! Status: ${error.status}.`;
  }
};
