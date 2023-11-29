"use client";

import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./frame.module.css";
import LoginButton from "@/components/LoginButton";
import Input from "@/components/Input";
import Image from "next/image";
import Message from "./message";
import donggukLogo from "../../../public/images/dongguk.jpg";

const Frame = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const bearerTokenRegex = /Bearer\s+([^ \n\r]+)/;

  const handleLogin = async () => {
    try {
      const data = {
        user_code: id,
        password: pw,
      };
      const response = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        data
      );
      // response로 토큰 체크 후 home으로
      const token = response.headers.toString().match(bearerTokenRegex);
      console.log(token ? token[0] : "null");
      localStorage.setItem("Authorization", token ? token[0] : "null");
      Swal.fire({
        title: `반갑습니다`,
        text: "초기 세팅 후 메인 페이지로 넘어갑니다.",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        router.push(`/home/${data.user_code}`);
      });
    } catch (error) {
      Swal.fire({
        title: "로그인에 실패했습니다.",
        text: `사유 : ${error}`,
        icon: `error`,
        confirmButtonColor: "#ed8b00",
      });
      console.log(id, pw);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <Image src={donggukLogo} alt="dongguk" className={styles.logo} />
        <div className={styles.frame}>
          <div className={styles.inputContainer}>
            <Input
              typeStyle="text"
              onChange={(e) => {
                setId(e.target.value);
              }}
            ></Input>
            <Input
              typeStyle="password"
              onChange={(e) => {
                setPw(e.target.value);
              }}
            ></Input>
          </div>
          <LoginButton onClick={handleLogin}></LoginButton>
        </div>
        <div className={styles.notice}>
          <Message></Message>
        </div>
      </div>
    </div>
  );
};

export default Frame;
