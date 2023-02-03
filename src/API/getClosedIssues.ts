import { RequestError } from '@octokit/types';

import { Issue } from '~/Model';

import { ENDPOINT, Params } from './endpoints';
import { Http } from './handleRequests';

export const getClosedIssues = async ({
  owner,
  repo
}: Params): Promise<Issue[]> => {
  try {
    const result = await Http.request(ENDPOINT.CLOSED_ISSUES_LIST, {
      owner,
      repo
    });
    return result.data;
  } catch (err) {
    const error = err as RequestError;
    throw `Error! Status: ${error.status}.`;
  }
};
