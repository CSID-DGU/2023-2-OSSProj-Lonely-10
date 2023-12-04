"use client";

import styles from "./styles.module.css";
import Link from "next/link";
type ConatinerProps = {
  noticeName?: string;
  baseURL: string;
  children?: React.ReactNode;
  date?: string;
  administrator?: string;
  plusButton?: boolean;
};

const Container = (props: ConatinerProps) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.subjectStyle}>
          <span>
            <Link className={styles.title} href={props.baseURL}>
              {props.noticeName}
            </Link>
          </span>
        </div>
        <hr />
        {props.children}
        <p className={styles.pBottom}>{props.date || props.administrator}</p>
      </div>
    </>
  );
};

export default Container;
