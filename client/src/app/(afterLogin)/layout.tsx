import React, { Suspense } from "react";
import Nav from "@/app/_common/Nav";
import Header from "@/app/_common/Header";

import "../globals.css";
export const metadata = {
  metadataBase: new URL("https://localhost:3000/"),
  title: {
    absolute: "동국포탈",
    template: "%s | 동국포탈",
  },
};

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
          <Header></Header>
          <Nav></Nav>
          {children}
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
