import React, { Suspense } from "react";
import Greeting from "@/components/Greeting";
import SubNav from "@/components/SubNav";
import Button from "@/components/Button";
import styles from "./Article.module.css";

interface Props {
  children: React.ReactNode;
}

// fb:app_id는 Metadata에서 지원하지 않음, others에 넣으면 property가 아니라 name으로 들어감..
const RootLayout = ({ children }: Props) => {
  return (
    <html lang="ko">
      <head>
        {/* <meta property="fb:app_id" content="1374093376066474" /> */}
        <meta name="view-transition" content="same-origin" />
      </head>
      <body>
        <Suspense fallback={null}>
          <div className={styles.leftFrame}>
            <Greeting userName="박세호"></Greeting>
            <SubNav>
              <Button link="/lms/info">학적조회</Button>
              <Button link="/lms/grade">성적조회</Button>
              <Button link="/lms/before">이전학기 성적조회</Button>
            </SubNav>
          </div>
          {children}
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
