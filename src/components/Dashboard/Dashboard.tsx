import ClayCard from '@clayui/card';

import { PullsMergeTimeChart } from '../_partials/PullsMergeTimeChart';
import styles from './Dashboard.module.scss';

const AV_MERGE_TIME = [['time', 124587584359, 324534534543, 484534534543]];

export const Dashboard = (): JSX.Element => {
  return (
    <div className={styles.dashboard}>
      <ClayCard>
        <div className="text-left border-bottom c-p-3 c-mb-4">
          Average Merge Time by Pull Request Size
        </div>
        <PullsMergeTimeChart data={AV_MERGE_TIME} />
      </ClayCard>
    </div>
  );
};
