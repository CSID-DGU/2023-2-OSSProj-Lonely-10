"use client";
import Button from "@/components/Button";
import SubNav from "@/components/SubNav";
import Greeting from "@/components/Greeting";
import TableArticle from "./TableArticle";
import styles from "./Article.module.css";
import { usePathname } from "next/navigation";

const Article = () => {
  const pathname = usePathname();
  const regex = /\/([^\/]+)\/?$/;
  const matchResult = pathname.match(regex);
  const userId = matchResult ? matchResult[1] : null;
  return (
    <div className={styles.layout}>
      <div className={styles.leftFrame}>
        <Greeting></Greeting>
        <SubNav>
          <Button link={`/lms/${userId}`}>학적조회</Button>
          <Button link={`/lms/grade/${userId}`}>성적조회</Button>
        </SubNav>
      </div>
      <div className={styles.frame}>
        <TableArticle></TableArticle>
      </div>
    </div>
  );
};
export default Article;
