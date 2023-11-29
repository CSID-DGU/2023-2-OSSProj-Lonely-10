"use client";

import styles from "./styles.module.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import axios from "axios";
type GreetingProps = {
  userName: string;
  userCode?: string;
  width?: string;
};

const Greeting = (props: GreetingProps) => {
  const router = useRouter();
  return (
    <>
      <div
        className={styles.container}
        style={props.width ? { width: props.width } : { border: "1px" }}
      >
        <div className={styles.userBox}>
          <tr>{props.userName}님 반갑습니다.</tr>
          <tr>{props.userCode && `학번 : ${props.userCode} : ""`}</tr>
        </div>
        <button
          onClick={() => {
            Swal.fire({
              title: `로그아웃`,
              icon: "success",
              timer: 1200,
              showConfirmButton: false,
              timerProgressBar: true,
            }).then(() => {
              router.push("/login");
            });
          }}
          className={styles.logout}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Greeting;
