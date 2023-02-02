import ClayCard from '@clayui/card';

import {
  AverageTimeCards,
  PullsByDayChart,
  PullsBySizeChart
} from '~/components/_partials';

import styles from './Dashboard.module.scss';

export const Dashboard = (): JSX.Element => {
  return (
    <div className={styles.dashboard}>
      <ClayCard>
        <TitleCard title="Average Merge Time by Pull Request Size" />
        <PullsBySizeChart />
      </ClayCard>
      <div className={`d-sm-block d-md-flex ${styles.gap}`}>
        <AverageTimeCards />
      </div>
      <ClayCard>
        <TitleCard title="Month Summary" />
        <PullsByDayChart />
      </ClayCard>
    </div>
  );
};

export const TitleCard = ({ title }: { title: string }): JSX.Element => {
  return <div className="text-left border-bottom c-p-3 c-mb-4">{title}</div>;
};
