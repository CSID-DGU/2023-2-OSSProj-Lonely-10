import Button from "@/components/Button";
import SubNav from "@/components/SubNav";
import Greeting from "@/components/Greeting";
import TableTest from "./TableTest";
import styles from "./Article.module.css";
const Article = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.leftFrame}>
        <Greeting userName="박세호"></Greeting>
        <SubNav>
          <Button link="/lms/base">학적조회</Button>
          <Button link="/lms/grade">성적조회</Button>
          <Button link="/lms/enroll">등록조회</Button>
        </SubNav>
      </div>
      <div className={styles.frame}>
        <TableTest></TableTest>
      </div>
    </div>
  );
};
export default Article;
