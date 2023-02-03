import { Octokit } from 'octokit';

import { GITHUB_AUTH_KEY } from '~/constants/env';

export const Http = new Octokit({
  auth: GITHUB_AUTH_KEY
});
