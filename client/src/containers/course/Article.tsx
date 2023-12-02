"use client";
import Greeting from "@/components/Greeting";
import Container from "@/components/Container";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

interface scheduleProps {
  time: string;
  classroom: string;
  days: string;
}

interface courseProps {
  course_name: string;
  professor: string;
  schedules: scheduleProps[];
}

const Article = () => {
  const auth = localStorage.getItem("Authorization");
  const userCode = localStorage.getItem("user_code");
  const [CourseInfo, setCourseInfo] = useState<courseProps[]>([]);
  useEffect(() => {
    const getCourse = async () => {
      const res = await axios.get(`http://localhost/api/v1/lms/${userCode}`, {
        headers: {
          Authorization: auth,
        },
      });
      console.log(res.data.user_course);
      setCourseInfo(res.data.user_course);
      console.log(CourseInfo);
    };
    getCourse();
  }, []);
  return (
    <div className={styles.article}>
      <Greeting
        userName={"박세호"}
        userCode={userCode ? userCode : ""}
        width="30vw"
      ></Greeting>
      {CourseInfo &&
        CourseInfo.map((data) => (
          <Container
            noticeName={data.course_name}
            baseURL="https://eclass.dongguk.edu/"
          >
            <p>{data.professor}</p>
            <p>{data.schedules[0].classroom}</p>
            <p>{data.schedules[0].days}</p>
            <p>{data.schedules[0].time}</p>
          </Container>
        ))}
      {/* <Container
        noticeName="데이터사이언스"
        baseURL="https://www.dongguk.edu/article/GENERALNOTICES/list"
      >
        <h3>내용</h3>
      </Container>
      <Container
        noticeName="공학선형대수학"
        baseURL="https://www.dongguk.edu/article/HAKSANOTICE/list"
      >
        <h3>내용</h3>
      </Container>
      <Container
        noticeName="오픈소스소프트웨어프로젝트"
        baseURL="https://www.dongguk.edu/article/JANGHAKNOTICE/list"
      >
        <h3>내용</h3>
      </Container>
      <Container
        noticeName="딥러닝"
        baseURL="https://www.dongguk.edu/schedule/detail?schedule_info_seq=22"
      >
        <h3>내용</h3>
      </Container>
      <Container
        noticeName="일본어"
        baseURL="https://www.dongguk.edu/schedule/detail?schedule_info_seq=22"
      >
        <h3>내용</h3>
      </Container>
      <Container
        noticeName="EAS"
        baseURL="https://www.dongguk.edu/schedule/detail?schedule_info_seq=22"
      >
        <h3>내용</h3>
      </Container>
      <Container
        noticeName="머신러닝과데이터사이언스"
        baseURL="https://www.dongguk.edu/schedule/detail?schedule_info_seq=22"
      >
        <h3>내용</h3>
      </Container> */}
      <Container noticeName="오늘의 수업 " baseURL="/home">
        <table>
          <tbody>
            <tr>
              <td>10:30</td>
              <td>데이터사이언스개론</td>
            </tr>
            <tr>
              <td>13:00</td>
              <td>오픈소스소프트웨어프로젝트</td>
            </tr>
            <tr>
              <td>15:00</td>
              <td>딥러닝</td>
            </tr>
          </tbody>
        </table>
      </Container>
      <Container noticeName="오늘의 할일 " baseURL="/home">
        <table>
          <tbody>
            <tr>
              <td>10:30</td>
              <td>데이터사이언스개론</td>
            </tr>
            <tr>
              <td>13:00</td>
              <td>오픈소스소프트웨어프로젝트</td>
            </tr>
            <tr>
              <td>15:00</td>
              <td>딥러닝</td>
            </tr>
          </tbody>
        </table>
      </Container>
    </div>
  );
};

export default Article;
