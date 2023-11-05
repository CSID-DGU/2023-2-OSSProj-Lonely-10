"use client";

import styles from "./styles.module.css";
import Link from "next/link";
type ConatinerProps = {
  noticeName?: string;
  baseURL: string;
  children?: React.ReactNode;
};

const Container = (props: ConatinerProps) => {
  return (
    <>
      <div className={styles.container}>
        <Link className={styles.title} href={props.baseURL}>
          {props.noticeName}
        </Link>
        <hr />
        <p>{props.children}</p>
      </div>
    </>
  );
};

export default Container;
