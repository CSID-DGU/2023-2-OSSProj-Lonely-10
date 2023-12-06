"use client";

import styles from "./styles.module.css";
import Link from "next/link";
import { useGlobalContext } from "@/context/userContext";
import { useRouter } from "next/navigation";

const Nav = () => {
  const { userId } = useGlobalContext();
  const router = useRouter();
  return (
    <nav className={styles.navBar}>
      <ul className={styles.listContainer}>
        <li className={styles.listForm}>
          <Link className={styles.listElement} href={`/lms/${userId}`}>
            학적관리
          </Link>
        </li>
        <li className={styles.listForm}>
          <Link
            className={styles.listElement}
            href={`/enroll/search/${userId}`}
          >
            수강관리
          </Link>
        </li>
        <li className={styles.listForm}>
          <Link className={styles.listElement} href={`/course/${userId}`}>
            학습관리
          </Link>
        </li>
        <li className={styles.listForm}>
          <div
            className={styles.listElementBtn}
            onClick={() => {
              window.open("https://ddp.dongguk.edu");
            }}
          >
            Dream Path
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
