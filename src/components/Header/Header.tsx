import { Text } from '@clayui/core';

import styles from './Header.module.scss';

type HeaderProps = { title: string; content: string };

export const Header = ({ title, content }: HeaderProps): JSX.Element => {
  return (
    <div className={styles.header}>
      <Text size={6} weight="semi-bold">
        {title}
      </Text>
      <Text size={3}>{content}</Text>
    </div>
  );
};
