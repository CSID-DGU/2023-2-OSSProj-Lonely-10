"use client";
import Greeting from "@/components/Greeting";
import Container from "@/components/Container";
import styles from "./article.module.css";
import axios from "axios";
import { useGlobalContext } from "@/context/userContext";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface noticeProps {
  title: string;
  url: string;
  administrator: string;
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
        setScheduleNotice(response.data.schedule.slice(5, 11));
        setScholarshipNotice(response.data.scholarshipNotice);
        setCourseInfo(response.data.course);
        console.log(response.data);
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
    let index: number;
    if (noticeType === 0) {
      index = (generalIndex + 1) % (generallNotice.length - 1);
      setGeneralIndex(index);
    }
    if (noticeType === 1) {
      index = (haksaIndex + 1) % (haksaNotice.length - 1);
      setHaksaIndex(index);
    }
    if (noticeType === 2) {
      index = (scholarshipIndex + 1) % (scholarshipNotice.length - 1);
      setScholarshipIndex(index);
    }
  };

  return (
    <div className={styles.article}>
      <Greeting width="30vw"></Greeting>
      <Container
        noticeName="일반공지"
        administrator={generallNotice[0].administrator}
        baseURL={generallNotice[0].url}
        isButton={true}
        title={removePrefix(generallNotice[0].title)}
      >
        {/* <button onClick={() => handleNoticeIndex(0)}>►</button> */}
      </Container>
      <Container
        noticeName="학사공지"
        administrator={haksaNotice[0].administrator}
        baseURL={haksaNotice[0].url}
        isButton={true}
        title={removePrefix(haksaNotice[0].title)}
      >
        {/* <button onClick={() => handleNoticeIndex(1)}>►</button> */}
      </Container>
      <Container
        noticeName="장학공지"
        administrator={scholarshipNotice[0].administrator}
        baseURL={scholarshipNotice[0].url}
        isButton={true}
        title={removePrefix(scholarshipNotice[0].title)}
      >
        {/* <button onClick={() => handleNoticeIndex(2)}>►</button> */}
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
