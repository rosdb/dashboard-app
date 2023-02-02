import ClayChart from '@clayui/charts';
import { format } from 'date-fns';

import { usePullsBySizeChart } from './usePullsBySizeChart';

export const PullsBySizeChart = (): JSX.Element => {
  const {
    averageBySize: { small, medium, large },
    isLoading
  } = usePullsBySizeChart();

  const AV_MERGE_TIME_BY_SIZE = [['time', small, medium, large]];

  return (
    <div className="c-p-3">
      {isLoading ? (
        '...loading'
      ) : (
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
            columns: AV_MERGE_TIME_BY_SIZE,
            type: 'bar'
          }}
          legend={{
            hide: 'time'
          }}
        />
      )}
    </div>
  );
};
