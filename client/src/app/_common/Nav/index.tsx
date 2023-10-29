"use client";

import styles from "./styles.module.css";
import Link from "next/link";
const Nav = () => {
  return (
    <nav className={styles.navBar}>
      <ul className={styles.listContainer}>
        <li className={styles.listForm}>
          <Link className={styles.listElement} href={"/info"}>
            학적관리
          </Link>
        </li>
        <li className={styles.listForm}>
          <Link className={styles.listElement} href={"/enroll"}>
            수강관리
          </Link>
        </li>
        <li className={styles.listForm}>
          <Link className={styles.listElement} href={"/course"}>
            학습관리
          </Link>
        </li>
        <li className={styles.listForm}>
          <Link
            className={styles.listElement}
            href={"https://ddp.dongguk.edu/"}
          >
            Dream Path
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
