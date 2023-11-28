"use client";
import Greeting from "@/components/Greeting";
import Container from "@/components/Container";
import styles from "./article.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

interface InfoProps {
  user_code: string;
  user_name: string;
}

interface generalProps {
  administrator: string;
  title: string;
  url: string;
}

interface scheduleProps {
  date: string;
  administrator: string;
  title: string;
}

const Article = () => {
  const [info, setInfo] = useState<InfoProps>({
    user_code: "",
    user_name: "",
  });
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
  const [scheduleNotice, setScheduleNotice] = useState<scheduleProps>({
    date: "",
    administrator: "",
    title: "",
  });

  const userCode = localStorage.getItem("user_code");
  const auth = localStorage.getItem("Authorization");
  //jake-seo-dev.tistory.com/138 [제이크서 위키 블로그:티스토리]

  출처: https: useEffect(() => {
    const handleNotice = async () => {
      try {
        const response = await axios.get(
          `http://localhost/api/v1/main/${userCode}`,
          {
            headers: {
              Authorization: auth,
            },
          }
        );
        setInfo(response.data.info);
        setGenerallNotice(response.data.generalNotice[0]);
        setHakasNotice(response.data.haksaNotice[0]);
        setScheduleNotice(response.data.schedule[10]);
        setScholarshipNotice(response.data.scholarshipNotice[0]);
      } catch (error) {
        console.log(error);
        console.log(userCode);
        console.log(auth ? auth.split("\n")[1].trim() : "not found");
      }
    };
    handleNotice();
  }, []);

  return (
    <div className={styles.article}>
      <Greeting
        userName={info.user_name}
        userCode={info.user_code}
        width="30vw"
      ></Greeting>
      <Container
        noticeName="일반공지"
        administrator={generallNotice.administrator}
        baseURL={generallNotice.url}
      >
        <h3>{generallNotice.title}</h3>
      </Container>
      <Container
        noticeName="학사공지"
        administrator={haksaNotice.administrator}
        baseURL={haksaNotice.url}
      >
        <h3>{haksaNotice.title}</h3>
      </Container>
      <Container
        noticeName="장학공지"
        administrator={scholarshipNotice.administrator}
        baseURL={scholarshipNotice.url}
      >
        <h3>{scholarshipNotice.title}</h3>
      </Container>
      <Container
        noticeName="학사일정"
        baseURL="https://www.dongguk.edu/schedule/detail?schedule_info_seq=22"
      >
        <tr>{scheduleNotice.title}</tr>
      </Container>
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
    </div>
  );
};

export default Article;
