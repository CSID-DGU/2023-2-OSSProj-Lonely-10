"use client";

import Image from "next/image";
import Link from "next/link";
import donggukLogo from "../../../../public/images/dongguk.jpg";
import styles from "./styles.module.css";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // 상위에 반드시 Suspense로 묶지 않으면 위로 타고 올라가며 Next SSR 전부 깨짐.
  const fullLayout = searchParams.get("layout") === "full";

  return (
    <header className={styles.header}>
      <Link href={"/home"}>
        <Image src={donggukLogo} alt="dongguk" className={styles.logo} />
      </Link>
    </header>
  );
};

export default Header;
