"use client";
import Greeting from "@/components/Greeting";
import Container from "@/components/Container";
import styles from "./article.module.css";
import axios from "axios";
import { useGlobalContext } from "@/context/userContext";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface noticeProps {
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
  classroom?: string;
  time: string;
}

const Article = () => {
  const { setUserId, setUserName } = useGlobalContext();
  const pathname = usePathname();
  const userCode = pathname.substring("/home/".length);

  const [generallNotice, setGenerallNotice] = useState<noticeProps[]>([]);
  const [scholarshipNotice, setScholarshipNotice] = useState<noticeProps[]>([]);
  const [haksaNotice, setHakasNotice] = useState<noticeProps[]>([]);
  const [scheduleNotice, setScheduleNotice] = useState<scheduleProps[]>([]);
  const [courseInfo, setCourseInfo] = useState<courseProps[]>([]);

  const [generalIndex, setGeneralIndex] = useState<number>(0);
  const [scholarshipIndex, setScholarshipIndex] = useState<number>(0);
  const [haksaIndex, setHaksaIndex] = useState<number>(0);

  const auth = localStorage.getItem("Authorization");
  useEffect(() => {
    const handleNotice = async () => {
      try {
        const response = await axios.get(`/api/v1/main/${userCode}`, {
          headers: {
            Authorization: auth,
          },
        });
        setUserId(response.data.info.user_code);
        setUserName(response.data.info.user_name);
        setGenerallNotice(response.data.generalNotice);
        setHakasNotice(response.data.haksaNotice);
        setScheduleNotice(response.data.schedule);
        setScholarshipNotice(response.data.scholarshipNotice);
        setCourseInfo(response.data.course);
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

  const handleNoticeIndex = (noticeType: number) => {
    if (noticeType === 0) {
      setGeneralIndex((generalIndex + 1) % (generallNotice.length - 1));
    }
    if (noticeType === 1) {
      setHaksaIndex((haksaIndex + 1) % (haksaNotice.length - 1));
    }
    if (noticeType === 2) {
      setScholarshipIndex((scholarshipIndex + 1) % (scheduleNotice.length - 1));
    }
  };

  return (
    <div className={styles.article}>
      <Greeting width="30vw"></Greeting>
      <Container
        noticeName="일반공지"
        administrator={`작성자 : ${generallNotice[generalIndex].administrator}`}
        baseURL={generallNotice[generalIndex].url}
        isButton={true}
        title={removePrefix(generallNotice[generalIndex].title)}
      >
        <button onClick={() => handleNoticeIndex(0)}>►</button>
      </Container>
      <Container
        noticeName="학사공지"
        administrator={`작성자 : ${haksaNotice[haksaIndex].administrator}`}
        baseURL={haksaNotice[haksaIndex].url}
        isButton={true}
        title={removePrefix(haksaNotice[haksaIndex].title)}
      >
        <button onClick={() => handleNoticeIndex(1)}>►</button>
      </Container>
      <Container
        noticeName="장학공지"
        administrator={`작성자 : ${scholarshipNotice[scholarshipIndex].administrator}`}
        baseURL={scholarshipNotice[scholarshipIndex].url}
        isButton={true}
        title={removePrefix(scholarshipNotice[scholarshipIndex].title)}
      >
        <button onClick={() => handleNoticeIndex(2)}>►</button>
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
