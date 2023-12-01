import Article from "./Article";
import Greeting from "@/components/Greeting";
import styles from "./enroll.module.css";
import SearchFrame from "./SearchFrame";
import Button from "@/components/Button";
import SubNav from "@/components/SubNav";
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
        <SubNav>
          <Button link="/lms/info">수강신청</Button>
          <Button link="/lms/grade">수강신청 결과조회</Button>
          {/* <Button link="/lms/before">이전학기 성적조회</Button> */}
        </SubNav>
      </div>
      <div className={styles.frame}>
        <Article>
          <SearchFrame></SearchFrame>
        </Article>
      </div>
    </div>
  );
};

export default Enroll;
