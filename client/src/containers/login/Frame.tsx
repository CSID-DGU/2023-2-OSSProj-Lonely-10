"use client";

import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGlobalContext } from "@/context/userContext";
import styles from "./frame.module.css";
import LoginButton from "@/components/LoginButton";
import Input from "@/components/Input";
import Image from "next/image";
import Message from "./message";
import donggukLogo from "../../../public/images/dongguk.jpg";

const Frame = () => {
  const router = useRouter();
  const { setUserId } = useGlobalContext();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const bearerTokenRegex = /Bearer\s+([^ \n\r]+)/;
  const handleLogin = async () => {
    try {
      const data = {
        user_code: id,
        password: pw,
      };
      const response = await axios.post("/api/v1/user/login", data, {
        withCredentials: true,
      });
      // response로 토큰 체크 후 home으로
      const token = response.headers.toString().match(bearerTokenRegex);
      localStorage.setItem("Authorization", token ? token[0] : "null");
      Swal.fire({
        title: `반갑습니다`,
        text: "초기 세팅 후 메인 페이지로 넘어갑니다.",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        setUserId(data.user_code);
        router.replace(`/home/${data.user_code}`);
      });
    } catch (error) {
      Swal.fire({
        title: "학번, 비밀번호를 확인해주세요!",
        icon: `error`,
        confirmButtonColor: "#ed8b00",
      });
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
              labelName="학번"
            ></Input>
            <Input
              typeStyle="password"
              onChange={(e) => {
                setPw(e.target.value);
              }}
              labelName="비밀번호"
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
