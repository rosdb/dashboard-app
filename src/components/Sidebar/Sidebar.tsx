import styles from './Sidebar.module.scss';

export const Sidebar = ({ logo }: { logo: string }): JSX.Element => {
  return (
    <div className={styles.sidebar}>
      <img src={logo} alt="logo" />
    </div>
  );
};
