"use client";

import styles from "./todo.module.css";

type TodoProps = {
  noticeName?: string;
  children?: React.ReactNode;
  date?: string;
  administrator?: string;
  plusButton?: boolean;
};

const Todo = ({ noticeName, children }: TodoProps) => {
  return (
    <>
      <div className={styles.container}>{children}</div>
    </>
  );
};
export default Todo;
