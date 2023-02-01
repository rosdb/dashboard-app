import ClayCard from '@clayui/card';

import {
  AverageTimeCards,
  PullsMergeByDayChart,
  PullsMergeBySizeChart
} from '~/components/_partials';

import styles from './Dashboard.module.scss';

const PR_BY_DAY = [
  [
    'x',
    '2018-01-01',
    '2018-02-01',
    '2018-03-01',
    '2018-04-01',
    '2018-05-01',
    '2018-06-01'
  ],
  ['Merged', 130, 340, 200, 100, 40, 300],
  ['Opened', 210, 180, 30, 90, 40, 120]
];

export const Dashboard = (): JSX.Element => {
  return (
    <div className={styles.dashboard}>
      <ClayCard>
        <TitleCard title="Average Merge Time by Pull Request Size" />
        <PullsMergeBySizeChart />
      </ClayCard>
      <div className={`d-sm-block d-md-flex ${styles.gap}`}>
        <AverageTimeCards />
      </div>
      <ClayCard>
        <TitleCard title="Month Summary" />
        <PullsMergeByDayChart data={PR_BY_DAY} />
      </ClayCard>
    </div>
  );
};

export const TitleCard = ({ title }: { title: string }): JSX.Element => {
  return <div className="text-left border-bottom c-p-3 c-mb-4">{title}</div>;
};
