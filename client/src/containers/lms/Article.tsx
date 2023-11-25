"use client";

import Button from "@/components/Button";
import SubNav from "@/components/SubNav";
import Greeting from "@/components/Greeting";
import TableTest from "./TableTest";
import styles from "./Article.module.css";
import { useEffect } from "react";

const Article = () => {
  useEffect(() => {
    const test = async () => {};
    test();
  }, []);
  return (
    <div className={styles.layout}>
      <div className={styles.leftFrame}>
        <Greeting userName="박세호"></Greeting>
        <SubNav>
          <Button link="/lms/info">학적조회</Button>
          <Button link="/lms/grade">성적조회</Button>
          <Button link="/lms/before">이전학기 성적조회</Button>
        </SubNav>
      </div>
      <div className={styles.frame}>
        <TableTest></TableTest>
      </div>
    </div>
  );
};
export default Article;
