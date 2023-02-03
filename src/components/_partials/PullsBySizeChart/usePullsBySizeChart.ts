import { useState } from 'react';
import { useQueries, useQuery } from 'react-query';

import { getClosedPulls, getPullFiles } from '~/API';
import { GITHUB_OWNER, GITHUB_REPO } from '~/constants/env';
import { Pull, PullFiles } from '~/model';
import { differenceBetweenTwoDates } from '~/utils';

interface AverageBySize {
  small: number;
  medium: number;
  large: number;
}

type Size = 'small' | 'medium' | 'large';

export interface MergedPull extends Pick<Pull, 'number'> {
  elapsedTime: number;
  size?: Size;
}

const initialState = {
  small: 0,
  medium: 0,
  large: 0
};

interface ReturnTypeObj {
  averageBySize: AverageBySize;
  isLoading: boolean;
  formattedPulls: MergedPull[];
  closedPullsFetchStatus: 'idle' | 'error' | 'loading' | 'success';
}

export const usePullsBySizeChart = (): ReturnTypeObj => {
  const [formattedPulls, setFormattedPulls] = useState<MergedPull[]>([]);
  const [averageBySize, setAverageBySize] =
    useState<AverageBySize>(initialState);
  const [pullsNumBySize, setPullsNumBySize] =
    useState<AverageBySize>(initialState);

  const { status: closedPullsFetchStatus } = useQuery({
    queryKey: 'closedPulls',
    queryFn: () => getClosedPulls({ owner: GITHUB_OWNER, repo: GITHUB_REPO }),
    refetchOnWindowFocus: false,
    onSuccess: d => handleClosedPulls(d)
  });

  const filesQueries = useQueries(
    formattedPulls.map(({ number }, _idx, srcArr) => {
      return {
        queryKey: ['pullFiles', number],
        queryFn: () =>
          getPullFiles({
            owner: 'liferay',
            repo: 'clay',
            pull_number: number
          }),
        enabled: closedPullsFetchStatus === 'success',
        refetchOnWindowFocus: false,
        onSuccess: (f: PullFiles[]) => handleFiles(f, srcArr)
      };
    })
  );

  const isLoading = filesQueries.some(result => result.isLoading);

  const handleClosedPulls = (d: Pull[]): void => {
    const closedPulls = d
      ?.filter(({ merged_at }) => Boolean(merged_at))
      .map(({ number, created_at, merged_at }) => {
        return {
          number,
          elapsedTime: merged_at
            ? differenceBetweenTwoDates(merged_at, created_at)
            : 0
        };
      });

    setFormattedPulls(closedPulls);
  };

  const handleFiles = (files: PullFiles[], srcArr: MergedPull[]): void => {
    const changes = getFileChanges(files);

    setFormattedPulls(
      srcArr.map(pr => ({
        ...pr,
        size: getPullSize(changes)
      }))
    );

    setPullsCountBySize(changes);

    handleAverageBySize(formattedPulls);
  };

  /**
   * @description given a list of formatted merged pulls, it sets an object with a key that define the average merge time by pulls size.
   * @param {MergedPull[]} pulls
   */
  const handleAverageBySize = (pulls: MergedPull[]): void => {
    const averageBySizeObj = pulls.reduce(
      (acc, { size, elapsedTime }) =>
        size
          ? {
              ...acc,
              [size]: (acc[size] + elapsedTime) / pullsNumBySize[size]
            }
          : acc,
      averageBySize
    );

    setAverageBySize(averageBySizeObj);
  };

  /**
   * @description given a list of a pull files, it returns a sum of all changes.
   * @param {PullFiles[]} files
   */
  const getFileChanges = (files: PullFiles[]): number =>
    files.map(file => file.changes).reduce((a, b) => a + b, 0);

  /**
   * @description given a number of all files changes, it sets number of pull by size
   * @param {number} changes
   */
  const setPullsCountBySize = (changes: number) => {
    const size = getPullSize(changes);

    if (size) {
      setPullsNumBySize({
        ...pullsNumBySize,
        [size]: pullsNumBySize[size] + 1
      });
    }
  };

  /**
   * @description given a number of all files changes, it returns the category of the pull ('small', 'medium' or 'large')
   * @param {number} changes
   */
  const getPullSize = (changes: number): Size | undefined => {
    if (changes <= 100) {
      return 'small';
    }

    if (changes <= 1000) {
      return 'medium';
    }

    if (changes > 1000) {
      return 'large';
    }
  };

  return { averageBySize, isLoading, formattedPulls, closedPullsFetchStatus };
};
