"use client";

import React, { MouseEventHandler, useState } from "react";
import Link from "next/link";
import cx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import { flushSync } from "react-dom";

// import { transitionHelper } from '@/utils/transition';
// import { ROUTES } from './constants';

// import NavLink from '@/components/NavLink';
// import Session from './Session';
// import styles from './index.module.scss';

const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // 상위에 반드시 Suspense로 묶지 않으면 위로 타고 올라가며 Next SSR 전부 깨짐.
  const fullLayout = searchParams.get("layout") === "full";

  //   interface Props {
  //     children: ReactNode;
  //     className?: string;
  //     link?: string;
  //     onClick?: () => void;
  //     type?: 'submit' | 'reset' | 'button';
  //     size?: 'tiny' | 'small';
  //     skin?: 'primary' | 'inverse' | 'ghost';
  //   }

  return (
    <header>
      <div>
        <Button type="button" link="/api/v1/user/login">
          테스트
        </Button>
      </div>
    </header>
  );
};

export default Header;
