import { useState } from 'react';
import { useQuery } from 'react-query';

import { getClosedIssues } from '~/API';
import { GITHUB_OWNER, GITHUB_REPO } from '~/constants/env';
import { Issue } from '~/model';
import { differenceBetweenTwoDates } from '~/utils';

import {
  MergedPull,
  usePullsBySizeChart
} from '../PullsBySizeChart/usePullsBySizeChart';

interface ClosedIssues {
  elapsedTime: number;
}

export const useAverageTimeCards = () => {
  const [formattedIssues, setFormattedIssues] = useState<ClosedIssues[]>([]);
  const [averageIssueTime, setAverageIssueTime] = useState<number>(0);
  const [averagePullsTime, setAveragePullsTime] = useState<number>(0);
  const { formattedPulls, closedPullsFetchStatus } = usePullsBySizeChart();

  const { isLoading } = useQuery({
    queryKey: 'closedIssues',
    queryFn: () =>
      getClosedIssues({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO
      }),
    enabled: closedPullsFetchStatus === 'success',
    refetchOnWindowFocus: false,
    onSuccess: issues => handleClosedIssues(issues)
  });

  const handleClosedIssues = (issues: Issue[]) => {
    setFormattedIssues(
      issues.map(({ created_at, closed_at }) => ({
        elapsedTime: closed_at
          ? differenceBetweenTwoDates(closed_at, created_at)
          : 0
      }))
    );

    handleAverageIssueTime(formattedIssues);

    handleAveragePullsTime(formattedPulls);
  };

  const handleAverageIssueTime = (issues: ClosedIssues[]) => {
    const averageIssueTimeObj = issues.reduce(
      (acc, { elapsedTime }) => acc + elapsedTime / issues.length,
      averageIssueTime
    );
    setAverageIssueTime(averageIssueTimeObj);
  };

  const handleAveragePullsTime = (pulls: MergedPull[]) => {
    const averagePullsTimeObj = pulls.reduce(
      (acc, { elapsedTime }) => acc + elapsedTime / pulls.length,
      averagePullsTime
    );
    setAveragePullsTime(averagePullsTimeObj);
  };

  return { isLoading, averageIssueTime, averagePullsTime };
};
