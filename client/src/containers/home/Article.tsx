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

  const [generalNotice, setGeneralNotice] = useState<noticeProps[]>([
    {
      title: "",
      url: "",
      administrator: "",
    },
  ]);
  const [scholarshipNotice, setScholarshipNotice] = useState<noticeProps[]>([
    {
      title: "",
      url: "",
      administrator: "",
    },
  ]);
  const [haksaNotice, setHakasNotice] = useState<noticeProps[]>([
    {
      title: "",
      url: "",
      administrator: "",
    },
  ]);
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
          withCredentials: true,
        });
        setUserId(response.data.info.user_code);
        setUserName(response.data.info.user_name);
        setGeneralNotice(response.data.generalNotice);
        setHakasNotice(response.data.haksaNotice);
        setScholarshipNotice(response.data.scholarshipNotice);
        setScheduleNotice(response.data.schedule.slice(5, 11));
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

  const renamePlace = (input: string): string => {
    const removePattern = (input: string): string => {
      return input.replace(/\([^)]*\)/g, "").trim();
    };
    return removePattern(input);
  };

  const handleNoticeIndex = (noticeType: number) => {
    let index: number;
    if (noticeType === 0) {
      index = (generalIndex + 1) % generalNotice.length;
      setGeneralIndex(index);
    }
    if (noticeType === 1) {
      index = (haksaIndex + 1) % haksaNotice.length;
      setHaksaIndex(index);
    }
    if (noticeType === 2) {
      index = (scholarshipIndex + 1) % scholarshipNotice.length;
      setScholarshipIndex(index);
    }
  };

  return (
    <div className={styles.article}>
      <Greeting width="30vw"></Greeting>
      <Container
        noticeName="일반공지"
        baseURL={`https://www.dongguk.edu/article/GENERALNOTICES/list`}
        isButton={true}
      >
        <h3 className={styles.contentTitle}>
          {removePrefix(generalNotice[generalIndex].title)}
        </h3>
        <p className={styles.contentAdmin}>
          {generalNotice[generalIndex].administrator}
        </p>
        <div className={styles.btnStyle}>
          <button
            className={styles.button}
            onClick={() => handleNoticeIndex(0)}
          >
            다음 공지
          </button>
        </div>
      </Container>
      <Container
        noticeName="학사공지"
        baseURL={`https://www.dongguk.edu/article/HAKSANOTICE/list`}
        isButton={true}
      >
        <h3 className={styles.contentTitle}>
          {removePrefix(haksaNotice[haksaIndex].title)}
        </h3>
        <p className={styles.contentAdmin}>
          {haksaNotice[haksaIndex].administrator}
        </p>
        <div className={styles.btnStyle}>
          <button
            className={styles.button}
            onClick={() => handleNoticeIndex(1)}
          >
            다음 공지
          </button>
        </div>
      </Container>
      <Container
        noticeName="장학공지"
        baseURL={`https://www.dongguk.edu/article/JANGHAKNOTICE/list`}
        isButton={true}
      >
        <div className={styles.containerBox}>
          <h3 className={styles.contentTitle}>
            {removePrefix(scholarshipNotice[scholarshipIndex].title)}
          </h3>
          <p className={styles.contentAdmin}>
            {scholarshipNotice[scholarshipIndex].administrator}
          </p>
          <div className={styles.btnStyle}>
            <button
              className={styles.button}
              onClick={() => handleNoticeIndex(2)}
            >
              다음 공지
            </button>
          </div>
        </div>
      </Container>
      <Container
        noticeName="학사일정"
        baseURL="https://www.dongguk.edu/schedule/detail?schedule_info_seq=22"
      >
        <table className={styles.tableStyle}>
          <tbody>
            {scheduleNotice.map((schedule, index) => (
              <tr key={index}>
                <td>{schedule.title}</td>
                <td>{schedule.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
      <Container noticeName="오늘의 수업 " baseURL="/course">
        <table className={styles.tableStyle}>
          <tbody>
            {courseInfo.map((course, index) => (
              <tr key={index}>
                <td>{course.course_name}</td>
                <td>{course.time}</td>
                <td>{`${
                  course.classroom && renamePlace(course.classroom)
                } 강의실`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </div>
  );
};

export default Article;
