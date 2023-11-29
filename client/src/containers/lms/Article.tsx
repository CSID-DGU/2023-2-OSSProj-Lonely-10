"use client";

import Button from "@/components/Button";
import SubNav from "@/components/SubNav";
import Greeting from "@/components/Greeting";
import TableArticle from "./TableArticle";
import styles from "./Article.module.css";

const Article = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.leftFrame}>
        <Greeting userName="박세호" userCode="201911127"></Greeting>
        <SubNav>
          <Button link="/lms/info">학적조회</Button>
          <Button link="/lms/grade">성적조회</Button>
          <Button link="/lms/before">이전학기 성적조회</Button>
        </SubNav>
      </div>
      <div className={styles.frame}>
        <TableArticle></TableArticle>
      </div>
    </div>
  );
};
export default Article;
