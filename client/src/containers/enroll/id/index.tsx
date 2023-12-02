"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./confirm.module.css";
import Swal from "sweetalert2";

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
    // 완료됐다는 어떤 시그널이 있을 때, useEffect 한 번씩 불러줘야함
  }, []);

  const handleCancel = (courseCode: string, courseName: string) => {
    console.log(courseCode, userCode);
    Swal.fire({
      title: `${courseName}과목 (${courseCode})을 수강 취소하시겠습니까?`,
      text: "취소 후 다시 되돌릴 수 없습니다.",
      icon: "warning",
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonText: "수강 취소",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost/api/v1/enroll/`, {
            headers: {
              Authorization: auth,
            },
            data: {
              user_code: userCode,
              course_code: courseCode,
            },
          })
          .then((res) => {
            Swal.fire(
              `${courseName} 과목이 수강 취소됐습니다.`,
              `학수번호 ${courseCode}`,
              "success"
            );
          });
      }
    });
  };

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
                <button
                  onClick={() =>
                    handleCancel(data.course_code, data.course_name)
                  }
                  className={styles.button}
                >
                  삭제 하기
                </button>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConfirmEnroll;
