import ClayChart from '@clayui/charts';
import { format } from 'date-fns';

import { usePullsMergeBySize } from './usePullsMergeBySize';

export const PullsMergeBySizeChart = ({
  data
}: {
  data: unknown;
}): JSX.Element => {
  const fetched = usePullsMergeBySize();
  console.log(fetched);
  return (
    <div className="c-p-3">
      <ClayChart
        axis={{
          x: { type: 'category', categories: ['Small', 'Medium', 'Large'] },
          y: {
            type: 'timeseries',
            tick: {
              format: (y: number | Date) => format(y, "k 'h'"),
              count: 5
            }
          }
        }}
        data={{
          columns: data,
          type: 'bar'
        }}
        legend={{
          hide: 'time'
        }}
      />
    </div>
  );
};
