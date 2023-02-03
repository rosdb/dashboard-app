import { eachDayOfInterval, isSameDay, parseISO, subMonths } from 'date-fns';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { getClosedPulls } from '~/API';
import { Pull } from '~/Model/Pulls';

export const usePullByDayChart = () => {
  const [openedPulls, setOpenedPulls] = useState<number[]>([]);
  const [mergedPulls, setMergedPulls] = useState<number[]>([]);

  const today = new Date();
  const lastMonth = subMonths(today, 1);
  const daysOfLastMonth = eachDayOfInterval({ start: lastMonth, end: today });

  const { isLoading } = useQuery({
    queryKey: 'pulls',
    queryFn: () => getClosedPulls({ owner: 'liferay', repo: 'clay' }),
    onSuccess: p => handlePullByDay(p, daysOfLastMonth),
    enabled: Boolean(daysOfLastMonth),
    refetchOnWindowFocus: false
  });

  const handlePullByDay = (pulls: Pull[], days: Date[]): void => {
    const pullsStatusLastMonth = days.map(day => {
      return {
        merged: pulls.filter(pr => compareTwoDates(day, pr.merged_at)).length,
        opened: pulls.filter(pr => compareTwoDates(day, pr.created_at)).length
      };
    });

    setOpenedPulls(pullsStatusLastMonth.map(({ opened }) => opened));
    setMergedPulls(pullsStatusLastMonth.map(({ merged }) => merged));
  };

  return { isLoading, daysOfLastMonth, openedPulls, mergedPulls };
};

// util
const compareTwoDates = (a: Date, b: string | null): boolean => {
  return b ? isSameDay(parseISO(b), a) : false;
};
