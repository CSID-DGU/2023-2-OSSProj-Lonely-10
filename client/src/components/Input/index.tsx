import styles from "./input.module.css";

type inputProps = {
  typeStyle: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: inputProps) => {
  return (
    <div className={styles.inputGroup}>
      <input
        type={props.typeStyle}
        onChange={props.onChange}
        className={styles.input}
      ></input>
    </div>
  );
};

export default Input;
