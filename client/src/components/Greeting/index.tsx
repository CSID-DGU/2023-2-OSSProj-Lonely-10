"use client";

import styles from "./styles.module.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/userContext";
import axios from "axios";
type GreetingProps = {
  width?: string;
};

const Greeting = (props: GreetingProps) => {
  const router = useRouter();
  const { userId, userName } = useGlobalContext();
  return (
    <>
      <div
        className={styles.container}
        style={props.width ? { width: props.width } : { border: "1px" }}
      >
        <div className={styles.userBox}>
          <table>
            <td>
              <tr>{userName}님 반갑습니다.</tr>
              <tr>{userId}</tr>
            </td>
          </table>
        </div>
        <button
          onClick={() => {
            Swal.fire({
              title: `로그아웃`,
              icon: "success",
              timer: 1200,
              showConfirmButton: false,
              timerProgressBar: true,
            })
              .then(() => {
                axios.post(`https://dev-changseop.site/api/v1/main/${userId}`);
              })
              .then(() => {
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
