"use client";

import styles from "./styles.module.css";

type ConatinerProps = {
  noticeName: string;
  contents: string;
};

const Container = (props: ConatinerProps) => {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.title}>{props.noticeName}</p>
      </div>
    </>
  );
};

export default Container;
