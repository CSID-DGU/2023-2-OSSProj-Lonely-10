import RootLayout from "../layout";
import styles from "./layout.module.css";

interface Props {
  children: React.ReactNode;
}

const LoginLayout = ({ children }: Props) => {
  return (
    <RootLayout>
      <div className={styles.login}>{children}</div>
    </RootLayout>
  );
};

export default LoginLayout;
