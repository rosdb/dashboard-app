export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Repo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: User;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string | null;
  updated_at: string | null;
  pushed_at: string | null;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions?: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license?: Record<string, unknown> | null;
  allow_forking?: boolean;
  is_template?: boolean;
  web_commit_signoff_required?: boolean;
  topics?: string[];
  visibility?: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

export interface Branch {
  label: string;
  ref: string;
  sha: string;
  user: User | null;
  repo: Repo;
}

export interface License {
  key: string;
  name: string;
  spdx_id: string;
  url?: string;
  node_id: string;
}

export interface Href {
  href: string;
}

export interface Links {
  self: Href;
  html: Href;
  issue: Href;
  comments: Href;
  review_comments: Href;
  review_comment: Href;
  commits: Href;
  statuses: Href;
}

export interface Pull {
  url: string;
  id: number;
  node_id: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  issue_url: string;
  number: number;
  state: string;
  locked: boolean;
  title: string;
  user: User | null;
  body: string | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  merged_at: string | null;
  merge_commit_sha: string | null;
  assignee: User | null;
  assignees?: User[] | null;
  requested_reviewers?: User[] | null;
  requested_teams?: unknown[] | null;
  labels: unknown[] | null;
  milestone?: Record<string, unknown> | null;
  draft?: boolean;
  commits_url: string;
  review_comments_url: string;
  review_comment_url: string;
  comments_url: string;
  statuses_url: string;
  head: Branch;
  base: Branch;
  _links: Links;
  author_association: string;
  auto_merge: unknown;
  active_lock_reason?: string | null;
}

export interface PullFiles {
  sha: string;
  filename: string;
  status:
    | 'added'
    | 'removed'
    | 'modified'
    | 'renamed'
    | 'copied'
    | 'changed'
    | 'unchanged';
  additions: number;
  deletions: number;
  changes: number;
  blob_url: string;
  raw_url: string;
  contents_url: string;
  patch?: string | undefined;
  previous_filename?: string | undefined;
}
