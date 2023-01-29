import ClayChart from '@clayui/charts';
// import { format } from 'date-fns';

export const PullsMergeByDayChart = ({
  data
}: {
  data: unknown;
}): JSX.Element => {
  return (
    <div className="c-p-3">
      <ClayChart
        axis={{
          x: {
            type: 'timeseries'
          }
        }}
        data={{
          columns: data,
          type: 'line',
          x: 'x'
        }}
        point={{
          pattern: ['circle']
        }}
      />
    </div>
  );
};
