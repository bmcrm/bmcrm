import styles from './AuthForm.module.scss';

interface AuthFormProps {
  children: React.ReactNode
}
export const AuthForm = ({ children }: AuthFormProps) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.badge}>Create a camp</p>
      {children}
    </div>
  );
};
