import ClayCard from '@clayui/card';

const AV_MERGE_TIME = '1Day 2h30m';
const AV_CLOSE_TIME = '5Days 3h25m';

const data = [
  { title: 'Average Pull Request Merge Time', content: AV_MERGE_TIME },
  { title: 'Average Issue Close Time', content: AV_CLOSE_TIME }
];

export const AverageTimeCards = (): JSX.Element => {
  return (
    <>
      {data.map(({ title, content }, idx) => (
        <ClayCard key={idx} className="w-100">
          <div className="text-left border-bottom c-p-3">{title}</div>
          <p className="text-center text-11 c-p-4">{content}</p>
        </ClayCard>
      ))}
    </>
  );
};
