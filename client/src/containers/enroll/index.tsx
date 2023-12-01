import Article from "./Article";
import Greeting from "@/components/Greeting";
import styles from "./enroll.module.css";
const userCode = "2019112127";
const userName = "박세호";
const Enroll = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.leftFrame}>
        <Greeting
          userName={userName ? userName : "이름오류"}
          userCode={userCode ? userCode : "학번오류"}
        ></Greeting>
      </div>
      <div className={styles.frame}>
        <Article></Article>
      </div>
    </div>
  );
};

export default Enroll;
