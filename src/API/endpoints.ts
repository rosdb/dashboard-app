export const ENDPOINT = {
  CLOSED_ISSUES_LIST: 'GET /repos/{owner}/{repo}/issues?state=closed',
  CLOSED_PULLS_LIST: 'GET /repos/{owner}/{repo}/pulls?state=closed',
  PULLS_LIST: 'GET /repos/{owner}/{repo}/pulls',
  PULL_FILES: 'GET /repos/{owner}/{repo}/pulls/{pull_number}/files'
} as const;

export type Params = {
  owner: string;
  repo: string;
};

export type ParamsWithPullFiles = Params & { pull_number: number };
