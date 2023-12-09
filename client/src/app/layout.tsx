import React, { Suspense } from "react";
import { GlobalContextProvier } from "@/context/userContext";
import { CourseDetailProvider } from "@/context/courseDetailContext";
import "./globals.css";
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
        <GlobalContextProvier>
          <CourseDetailProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </CourseDetailProvider>
        </GlobalContextProvier>
      </body>
    </html>
  );
};

export default RootLayout;
