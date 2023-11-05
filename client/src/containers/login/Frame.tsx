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
        username: id,
        password: pw,
      };
      const response = await axios.post("http://localhost:8080", data);
      console.log("Response:", response);
      // response로 토큰 체크 후 home으로
      router.push("/home");
    } catch (error) {
      console.error("Error:", error);
      // console.log(id, pw);
      // window.location.href = "/home";
    }
  };

  return (
    <div className={styles.frame}>
      <Image src={donggukLogo} alt="dongguk" className={styles.logo} />
      <div className={styles.modal}>
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
  );
};

export default Frame;
