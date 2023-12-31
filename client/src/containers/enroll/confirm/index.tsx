"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./confirm.module.css";
import Swal from "sweetalert2";
import Greeting from "@/components/Greeting";
import SubNav from "@/components/SubNav";
import Button from "@/components/Button";

interface infoProps {
  course_code: string;
  course_name: string;
  professor: string;
}

const ConfirmEnroll = () => {
  const auth = localStorage.getItem("Authorization");
  const pathname = usePathname();
  const regex = /\/([^\/]+)\/?$/;
  const matchResult = pathname.match(regex);
  const userId = matchResult ? matchResult[1] : null;

  const [classInfo, setClassInfo] = useState<infoProps[]>([]);
  const [enrollmentCancelled, setEnrollmentCancelled] =
    useState<boolean>(false);

  useEffect(() => {
    const getEnroll = async () => {
      const res = await axios.get(`/api/v1/register/${userId}`, {
        headers: {
          Authorization: auth,
        },
        withCredentials: true,
      });
      setClassInfo(res.data.enrollList);
    };
    if (enrollmentCancelled) {
      setEnrollmentCancelled(false);
    }
    getEnroll();
  }, [enrollmentCancelled]);

  const handleCancel = async (courseCode: string, courseName: string) => {
    const result = await Swal.fire({
      title: `${courseName}과목 (${courseCode})을 수강 취소하시겠습니까?`,
      text: "취소 후 다시 되돌릴 수 없습니다.",
      icon: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      timerProgressBar: true,
      confirmButtonText: "수강 취소",
      cancelButtonText: "X",
      confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`/api/v1/register`, {
          data: { user_code: userId, course_code: courseCode },
          headers: {
            Authorization: auth,
          },
          withCredentials: true,
        });
        if (response.data === "success") {
          setEnrollmentCancelled(true);
          Swal.fire(
            `${courseName} 과목이 수강 취소됐습니다.`,
            `학수번호 ${courseCode}`,
            "success"
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.leftFrame}>
        <Greeting></Greeting>
        <SubNav>
          <Button link={`/enroll/search/${userId}`}>수강신청</Button>
          <Button link={`/enroll/confirm/${userId}`}>수강신청 결과조회</Button>
        </SubNav>
      </div>
      <div className={styles.frame}>
        <h3>수강 신청 조회</h3>
        <br />
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
    </div>
  );
};

export default ConfirmEnroll;
