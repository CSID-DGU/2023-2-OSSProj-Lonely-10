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
};

const Container = (props: ConatinerProps) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.subjectStyle}>
          <span>
            <p
              className={styles.title}
              onClick={() => {
                window.open(props.baseURL);
              }}
            >
              {props.noticeName}
            </p>
          </span>
        </div>
        <hr />
        <p className={styles.pBottom}>{props.administrator}</p>
        {props.children}
      </div>
    </>
  );
};

export default Container;
