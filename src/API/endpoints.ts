export const ENDPOINT = {
  CLOSED_ISSUES_LIST: 'GET /repos/{owner}/{repo}/issues?state=closed',
  CLOSED_PULLS_LIST: 'GET /repos/{owner}/{repo}/pulls?state=closed',
  PULLS_LIST: 'GET /repos/{owner}/{repo}/pulls'
} as const;
