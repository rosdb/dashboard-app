import ClayCard from '@clayui/card';
import { format } from 'date-fns';

import { useAverageTimeCards } from './useAverageTimeCards';

export const AverageTimeCards = (): JSX.Element => {
  const { isLoading, averageIssueTime, averagePullsTime } =
    useAverageTimeCards();

  const AV_MERGE_TIME = format(averagePullsTime, "d'days' k'h' m'm'");
  const AV_CLOSE_TIME = format(averageIssueTime, "d'days' k'h' m'm'");

  const data = [
    {
      title: 'Average Pull Request Merge Time',
      content: AV_MERGE_TIME
    },
    {
      title: 'Average Issue Close Time',
      content: AV_CLOSE_TIME
    }
  ];

  return (
    <>
      {data.map(({ title, content }, idx) => (
        <ClayCard key={idx} className="w-100">
          <div className="text-left border-bottom c-p-3">{title}</div>
          {isLoading ? (
            <span>...loading</span>
          ) : (
            <p className="text-center text-11 c-p-4">{content}</p>
          )}
        </ClayCard>
      ))}
    </>
  );
};
