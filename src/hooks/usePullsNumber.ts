import { useQuery } from 'react-query';

import { getClosedPulls } from '~/API';

export const usePullsNumber = () => {
  const { data } = useQuery('closedPulls', () =>
    getClosedPulls({ owner: 'liferay', repo: 'clay' })
  );

  const pullsNumberList = data?.map(p => {
    return p.number;
  });

  return { pullsNumberList };
};
