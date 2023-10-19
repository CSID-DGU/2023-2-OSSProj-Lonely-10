/* eslint-disable react/button-has-type */
import { ReactNode } from "react";
import cx from "clsx";
import Link from "next/link";

interface Props {
  children: ReactNode;
  className?: string;
  link?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  size?: "tiny" | "small";
  skin?: "primary" | "inverse" | "ghost";
}

const Button = ({
  link,
  children,
  className,
  onClick,
  type,
  size,
  skin,
}: Props) => {
  if (link) {
    return <Link href={link}>{children}</Link>;
  }

  return (
    <button
      type={type}
      //   className={cx(
      //     styles.commonButton,
      //     className,
      //     styles[size ?? "normal"],
      //     styles[skin ?? "normal"]
      //   )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
