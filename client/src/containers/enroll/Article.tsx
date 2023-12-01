"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./table.module.css";

interface articleProps {
  children: React.ReactNode;
}

const Article = ({ children }: articleProps) => {
  return (
    <>
      <h3>수강 신청 페이지</h3>
      {children}
    </>
  );
};

export default Article;
