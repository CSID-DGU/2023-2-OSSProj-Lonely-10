"use client";

import styles from "./styles.module.css";
import Link from "next/link";
type ConatinerProps = {
  noticeName?: string;
  baseURL: string;
  children?: React.ReactNode;
  date?: string;
  title?: string;
  administrator?: string;
  isButton?: boolean;
  isCourse?: boolean;
};

const Container = (props: ConatinerProps) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.subjectStyle}>
          <p
            className={styles.title}
            onClick={() => {
              window.open(props.baseURL);
            }}
          >
            {props.noticeName}
          </p>
          {props.isCourse && (
            <div className={styles.select}>
              <span className={styles.selectDetail}>공지</span>
              <span className={styles.selectDetail}>과제</span>
              <span className={styles.selectDetail}>출결</span>
            </div>
          )}
        </div>
        <hr />
        <div className={styles.contents}>{props.children}</div>
        {/* <p className={styles.pBottom}>{props.administrator}</p> */}
      </div>
    </>
  );
};

export default Container;
