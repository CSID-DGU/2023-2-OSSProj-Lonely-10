"use client";

import styles from "./frame.module.css";
import LoginButton from "@/components/LoginButton";
import Input from "@/components/Input";
import Image from "next/image";
import Message from "./message";
import donggukLogo from "../../../public/images/dongguk.jpg";
import Link from "next/link";
const Frame = () => {
  return (
    <div className={styles.frame}>
      <Image src={donggukLogo} alt="dongguk" className={styles.logo} />
      <div className={styles.modal}>
        <div className={styles.inputContainer}>
          <Input></Input>
          <Input></Input>
        </div>
        <Link href={"/home"}>
          <LoginButton></LoginButton>
        </Link>
      </div>
      <div className={styles.notice}>
        <Message></Message>
      </div>
    </div>
  );
};

export default Frame;
