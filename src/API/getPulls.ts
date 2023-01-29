import { RequestError } from '@octokit/types';

import { ENDPOINT } from './endpoints';
import { Http } from './handleRequests';

export const getPulls = async ({
  owner,
  repo
}: {
  owner: string;
  repo: string;
}): Promise<void> => {
  try {
    const result = await Http.request(ENDPOINT.PULLS_LIST, {
      owner,
      repo
    });
    console.log(result.data);
  } catch (err) {
    const error = err as RequestError;
    console.log(`Error! Status: ${error.status}.`);
  }
};
