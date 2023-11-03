"use client";
import styles from "./loginButton.module.css";
import { useRouter } from "next/router";

// type loginProps = {
//   onClick: () => void;
// };

const LogintButton = () => {
  return <div className={styles.button}>Login</div>;
};

export default LogintButton;
