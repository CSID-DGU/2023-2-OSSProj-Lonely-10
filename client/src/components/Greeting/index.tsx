"use client";

import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";
type GreetingProps = {
  userName: string;
};

const Container = (props: GreetingProps) => {
  const router = useRouter();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.userBox}>
          <p>{props.userName}님 반갑습니다.</p>
        </div>
        <button
          onClick={() => {
            axios.post(
              `http://localhost:8080/api/v1/main/localStorage.getItem("user_code")`,
              {
                headers: {
                  Authorization: localStorage.getItem("auth"),
                },
              }
            );
            router.push("/login");
          }}
          className={styles.logout}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Container;
