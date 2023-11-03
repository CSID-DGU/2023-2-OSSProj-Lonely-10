// export default async function Layout({}) {}

// RootLayout -> 디렉토리의 Layout이 children으로 걸림

import React, { Suspense } from "react";
import styles from "./layout.module.css";

// import "../globals.css";
// export const metadata = {
//   metadataBase: new URL("https://localhost:3000/"),
//   title: {
//     absolute: "동국포탈",
//     template: "%s | 동국포탈",
//   },
// };

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
      <body className={styles.body}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
