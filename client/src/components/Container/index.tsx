"use client";

import styles from "./styles.module.css";

type ConatinerProps = {
  noticeName?: string;
  contents?: string;
  children?: React.ReactNode;
};

const Container = (props: ConatinerProps) => {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.title}>{props.noticeName}</p>
        <hr />
        <p>{props.children}</p>
      </div>
    </>
  );
};

export default Container;
