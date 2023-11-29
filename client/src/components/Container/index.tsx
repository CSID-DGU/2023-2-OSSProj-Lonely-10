"use client";

import styles from "./styles.module.css";
import Link from "next/link";
type ConatinerProps = {
  noticeName?: string;
  baseURL: string;
  children?: React.ReactNode;
  date?: string;
  administrator?: string;
};

const Container = (props: ConatinerProps) => {
  return (
    <>
      <div className={styles.container}>
        <Link className={styles.title} href={props.baseURL}>
          {props.noticeName}
        </Link>
        <hr />
        {props.children}
        <p className={styles.pBottom}>{props.date || props.administrator}</p>
      </div>
    </>
  );
};

export default Container;
