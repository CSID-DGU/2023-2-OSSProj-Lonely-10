import React from "react";
import Nav from "@/app/_common/Nav";
import Header from "@/app/_common/Header";
import RootLayout from "../layout";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <RootLayout>
      <Header></Header>
      <Nav></Nav>
      {children}
    </RootLayout>
  );
};

export default MainLayout;
