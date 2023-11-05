"use client";

import axios from "axios";
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

  const handleLogin = async () => {
    try {
      const data = {
        user_code: id,
        password: pw,
      };
      localStorage.setItem("user_code", id);
      console.log(data);
      const response = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        data
      );

      console.log("Response:", response);
      // response로 토큰 체크 후 home으로
      localStorage.setItem(
        "auth",
        "response 반환 형태를 몰라서 일단은 이렇게 둡니다!"
      );
      router.push("/home");
    } catch (error) {
      console.error("Error:", error);
      // console.log(id, pw);
      // window.location.href = "/home";
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
