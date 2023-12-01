"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./confirm.module.css";
interface infoProps {
  course_code: string;
  course_name: string;
  professor: string;
}

const ConfirmEnroll = () => {
  const auth = localStorage.getItem("Authorization");
  const userCode = localStorage.getItem("user_code");
  const [classInfo, setClassInfo] = useState<infoProps[]>([]);
  useEffect(() => {
    const getEnroll = async () => {
      const res = await axios.get(
        `http://localhost/api/v1/enroll/${userCode}`,
        {
          headers: {
            Authorization: auth,
          },
        }
      );
      setClassInfo(res.data.enrollList);
    };

    getEnroll();
  }, []);
  return (
    <div>
      <h3>수강 신청 조회</h3>
      <table>
        <tbody>
          {classInfo &&
            classInfo.map((data) => (
              <tr>
                <td>{data.course_name}</td>
                <td>{data.professor}</td>
                <td>{data.course_code}</td>
                <button className={styles.button}>삭제 하기</button>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConfirmEnroll;
