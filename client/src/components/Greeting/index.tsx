"use client";

import styles from "./styles.module.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
type GreetingProps = {
  width?: string;
};

const Greeting = (props: GreetingProps) => {
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const regex = /\/([^\/]+)\/?$/;
  const matchResult = pathname.match(regex);
  const userId = matchResult ? matchResult[1] : null;
  const auth = localStorage.getItem("Authorization");
  useEffect(() => {
    const getUserName = async () => {
      try {
        const response = await axios.get(`/api/v1/info/${userId}`, {
          headers: {
            Authorization: auth,
          },
          withCredentials: true,
        });
        setUserName(response.data.user_name);
      } catch (error) {
        console.log(error);
      }
    };
    getUserName();
  }, []);
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
                axios.post(
                  `/api/v1/main/${userId}`,
                  {},
                  {
                    headers: {
                      Authorization: auth,
                    },
                    withCredentials: true,
                  }
                );
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
