import Greeting from "@/components/Greeting";
import styles from "./layout.module.css";
import Button from "@/components/Button";
import SubNav from "@/components/SubNav";

interface Props {
  children: React.ReactNode;
}

const EnrollLayout = ({ children }: Props) => {
  const userCode = "2019112127";

  return (
    <div className={styles.layout}>
      <div className={styles.leftFrame}>
        <Greeting></Greeting>
        <SubNav>
          <Button link="/enroll">수강신청</Button>
          <Button link={`/enroll/${userCode}`}>수강신청 결과조회</Button>
        </SubNav>
      </div>
      <div className={styles.frame}>{children}</div>
    </div>
  );
};

export default EnrollLayout;
