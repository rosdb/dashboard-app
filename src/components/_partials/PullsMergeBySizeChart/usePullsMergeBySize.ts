import { differenceInMilliseconds } from 'date-fns';
import { useState } from 'react';
import { useQueries, useQuery } from 'react-query';

import { getClosedPulls, getPullFiles } from '~/API';
import { Pull, PullFiles } from '~/Model/Pulls';

interface AverageBySize {
  small: number;
  medium: number;
  large: number;
}

type Size = 'small' | 'medium' | 'large';

interface MergedPull extends Pick<Pull, 'number'> {
  elapsedTime: number;
  size?: Size;
}

const initialState = {
  small: 0,
  medium: 0,
  large: 0
};

export const usePullsMergeBySize = () => {
  const [formattedPulls, setFormattedPulls] = useState<MergedPull[]>([]);
  const [averageBySize, setAverageBySize] =
    useState<AverageBySize>(initialState);
  const [pullsNumBySize, setPullsNumBySize] =
    useState<AverageBySize>(initialState);

  const { status: closedPullsFetchStatus } = useQuery({
    queryKey: 'closedPulls',
    queryFn: () => getClosedPulls({ owner: 'liferay', repo: 'clay' }),
    onSuccess: d =>
      setFormattedPulls(
        d
          ?.filter(({ merged_at }) => Boolean(merged_at))
          .map(({ number, created_at, merged_at }) => ({
            number,
            elapsedTime: differenceBetweenTwoDates(created_at, merged_at)
          }))
      )
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
        onSuccess: (files: PullFiles[]) => {
          setFormattedPulls(
            srcArr.map(pr => ({
              ...pr,
              size: getPullSize(getFileChanges(files))
            }))
          );
          handleAverageBySize(formattedPulls);
        }
      };
    })
  );

  const isLoading = filesQueries.some(result => result.isLoading);

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
   * @description given a number of all files changes, it returns the category of the pull ('small', 'medium' or 'large') and sets the numbers of pulls in each category.
   * @param {number} changes
   */
  const getPullSize = (changes: number): Size | undefined => {
    if (changes <= 100) {
      setPullsNumBySize({ ...pullsNumBySize, small: pullsNumBySize.small + 1 });
      return 'small';
    }

    if (changes <= 1000) {
      setPullsNumBySize({
        ...pullsNumBySize,
        medium: pullsNumBySize.medium + 1
      });
      return 'medium';
    }

    if (changes > 1000) {
      setPullsNumBySize({
        ...pullsNumBySize,
        large: pullsNumBySize.large + 1
      });
      return 'large';
    }
  };

  return { averageBySize, isLoading };
};

// util
const differenceBetweenTwoDates = (start: string, end: string): number => {
  const createdAt = new Date(start);
  const mergedAt = new Date(end);
  return differenceInMilliseconds(mergedAt, createdAt);
};
