import styles from "./input.module.css";

type inputProps = {
  typeStyle: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: inputProps) => {
  return (
    <input
      type={props.typeStyle}
      onChange={props.onChange}
      className={styles.input}
    ></input>
  );
};

export default Input;
