import { eachDayOfInterval, subMonths } from 'date-fns';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { getClosedPulls } from '~/API';
import { GITHUB_OWNER, GITHUB_REPO } from '~/constants/env';
import { Pull } from '~/model/Pulls';
import { compareTwoDays } from '~/utils';

interface ReturnTypeObj {
  isLoading: boolean;
  daysOfLastMonth: Date[];
  openedPulls: number[];
  mergedPulls: number[];
}

export const usePullByDayChart = (): ReturnTypeObj => {
  const [openedPulls, setOpenedPulls] = useState<number[]>([]);
  const [mergedPulls, setMergedPulls] = useState<number[]>([]);

  const today = new Date();
  const lastMonth = subMonths(today, 1);
  const daysOfLastMonth = eachDayOfInterval({ start: lastMonth, end: today });

  const { isLoading } = useQuery({
    queryKey: 'pulls',
    queryFn: () => getClosedPulls({ owner: GITHUB_OWNER, repo: GITHUB_REPO }),
    enabled: Boolean(daysOfLastMonth),
    refetchOnWindowFocus: false,
    onSuccess: p => handlePullByDay(p, daysOfLastMonth)
  });

  const handlePullByDay = (pulls: Pull[], days: Date[]): void => {
    const pullsStatusLastMonth = days.map(day => {
      return {
        merged: pulls.filter(pr => compareTwoDays(day, pr.merged_at)).length,
        opened: pulls.filter(pr => compareTwoDays(day, pr.created_at)).length
      };
    });

    setOpenedPulls(pullsStatusLastMonth.map(({ opened }) => opened));
    setMergedPulls(pullsStatusLastMonth.map(({ merged }) => merged));
  };

  return { isLoading, daysOfLastMonth, openedPulls, mergedPulls };
};
