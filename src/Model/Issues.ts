import { User } from './Pulls';

export interface PullRequest {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  merged_at: Date;
}

export interface Reactions {
  url: string;
  total_count: number;
  '+1': number;
  '-1': number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

export interface Issue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: unknown[];
  state: string;
  locked: boolean;
  assignee?: unknown | null;
  assignees: unknown[] | null;
  milestone?: Record<string, unknown> | null;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
  author_association: string;
  active_lock_reason?: unknown;
  draft: boolean;
  pull_request: PullRequest;
  body: string;
  reactions: Reactions;
  timeline_url: string;
  performed_via_github_app?: unknown;
  state_reason?: unknown;
}
