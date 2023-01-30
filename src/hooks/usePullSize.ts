import { useQuery } from 'react-query';

import { getPullFiles } from '~/API';

export const usePullSize = ({ pullNumber }: { pullNumber: number }) => {
  const { data } = useQuery('pullFilse', () =>
    getPullFiles({ owner: 'liferay', repo: 'clay', pull_number: pullNumber })
  );

  const pullSize = data
    ?.map(p => {
      return p.changes;
    })
    .reduce((a, b) => a + b, 0);

  return { pullSize };
};
