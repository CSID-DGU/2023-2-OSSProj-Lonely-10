/* eslint-disable react/button-has-type */
import { ReactNode } from "react";
import styles from "./SubNav.module.css";
import Link from "next/link";

interface Props {
  children: ReactNode;
  className?: string;
  link?: string;
  onClick?: () => void;
}

const SubNav = ({ link, children, onClick }: Props) => {
  return <div className={styles.navContainer}>{children}</div>;
};

export default SubNav;
