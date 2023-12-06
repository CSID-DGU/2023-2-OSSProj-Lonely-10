"use client";
import Greeting from "@/components/Greeting";
import Container from "@/components/Container";
import styles from "./article.module.css";
import axios from "axios";
import { useGlobalContext } from "@/context/userContext";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
// interface InfoProps {
//   user_code: string;
//   user_name: string;
// }

interface generalProps {
  administrator: string;
  title: string;
  url: string;
}

interface scheduleProps {
  date: string;
  description: string;
  title: string;
}

interface courseProps {
  course_name: string;
  classroom: string;
  time: string;
}

const Article = () => {
  const pathname = usePathname();
  const userCode = pathname.substring("/home/".length);
  const { setUserId, setUserName } = useGlobalContext();
  // const [info, setInfo] = useState<InfoProps>({
  //   user_code: "",
  //   user_name: "",
  // });
  const [generallNotice, setGenerallNotice] = useState<generalProps>({
    administrator: "",
    title: "",
    url: "",
  });
  const [scholarshipNotice, setScholarshipNotice] = useState<generalProps>({
    administrator: "",
    title: "",
    url: "",
  });
  const [haksaNotice, setHakasNotice] = useState<generalProps>({
    administrator: "",
    title: "",
    url: "",
  });
  const [scheduleNotice, setScheduleNotice] = useState<scheduleProps[]>([]);
  const [courseInfo, setCourseInfo] = useState<courseProps[]>([]);
  const auth = localStorage.getItem("Authorization");
  useEffect(() => {
    const handleNotice = async () => {
      try {
        const response = await axios.get(`/api/v1/main/${userCode}`, {
          headers: {
            Authorization: auth,
          },
        });
        // console.log(response.data);
        setUserId(response.data.info.user_code);
        setUserName(response.data.info.user_name);
        // setInfo(response.data.info);
        setGenerallNotice(response.data.generalNotice[0]);
        setHakasNotice(response.data.haksaNotice[0]);
        setScheduleNotice(response.data.schedule.slice(4, 9));
        setScholarshipNotice(response.data.scholarshipNotice[0]);
        setCourseInfo(response.data.course);
        // console.log();
      } catch (error) {
        console.log(error);
        console.log(auth ? auth.split("\n")[1].trim() : "not found");
      }
    };
    handleNotice();
  }, []);
  const removePrefix = (str: string): string => {
    return str.replace(/^공지/, "");
  };

  return (
    <div className={styles.article}>
      <Greeting width="30vw"></Greeting>
      <Container
        noticeName="일반공지"
        administrator={`작성자 : ${generallNotice.administrator}`}
        baseURL={generallNotice.url}
      >
        <h3>{removePrefix(generallNotice.title)}</h3>
      </Container>
      <Container
        noticeName="학사공지"
        administrator={`작성자 : ${haksaNotice.administrator}`}
        baseURL={haksaNotice.url}
      >
        <h3>{removePrefix(haksaNotice.title)}</h3>
      </Container>
      <Container
        noticeName="장학공지"
        administrator={`작성자 : ${scholarshipNotice.administrator}`}
        baseURL={scholarshipNotice.url}
      >
        <h3>{removePrefix(scholarshipNotice.title)}</h3>
      </Container>
      <Container
        noticeName="학사일정"
        baseURL="https://www.dongguk.edu/schedule/detail?schedule_info_seq=22"
      >
        <table>
          <tbody>
            {scheduleNotice.map((schedule, index) => (
              <tr key={index}>
                <td>{schedule.title}</td>
                <td>{schedule.description}</td>
                <td>{schedule.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
      <Container noticeName="오늘의 수업 " baseURL="/course">
        <table>
          <tbody>
            {courseInfo.map((course, index) => (
              <tr key={index}>
                <td>{course.time}</td>
                <td>{course.classroom}</td>
                <td>{course.course_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </div>
  );
};

export default Article;

/**
 * 추가 할 일 : 기존 Array 내용도 다 볼 수 있도록 버튼 클릭시 그 다음 내용 나오도록
 */
