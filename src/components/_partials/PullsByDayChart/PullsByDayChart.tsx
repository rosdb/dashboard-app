import ClayChart from '@clayui/charts';
import { format } from 'date-fns';

import { usePullByDayChart } from './usePullByDayChart';

export const PullsByDayChart = (): JSX.Element => {
  const { daysOfLastMonth, openedPulls, mergedPulls } = usePullByDayChart();

  const PR_BY_DAY = [
    ['x', ...daysOfLastMonth],
    ['Merged', ...mergedPulls],
    ['Opened', ...openedPulls]
  ];

  return (
    <div className="c-p-3">
      <ClayChart
        axis={{
          x: {
            type: 'timeseries',
            tick: {
              format: (x: number | Date) => format(x, 'd LLL')
            }
          }
        }}
        data={{
          columns: PR_BY_DAY,
          type: 'line',
          x: 'x'
        }}
        point={{
          pattern: ['circle']
        }}
        legend={{
          usePoint: true
        }}
      />
    </div>
  );
};
