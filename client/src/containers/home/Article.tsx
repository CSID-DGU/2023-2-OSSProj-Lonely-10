"use client";
import Greeting from "@/components/Greeting";
import Container from "@/components/Container";
import styles from "./article.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { title } from "process";

const Article = () => {
  const [info, setInfo] = useState("박세호");
  const [generallNotice, setGenerallNotice] = useState("");
  const [janghakNotice, setJanghakNotice] = useState("");
  const [haksaNotice, setHakasNotice] = useState("");
  const [scheduleNotice, setScheduleNotice] = useState("");

  useEffect(() => {
    const handleNotice = async () => {
      try {
        const userCode = localStorage.getItem("user_code");
        const response = await axios.get(
          `http://localhost:8080/api/v1/main/${userCode}`,
          {
            headers: {
              Authorization: localStorage.getItem("auth"),
            },
          }
        );
        /**
         * expected result
         */
        // {
        //   "general_notice": [
        //     {
        //       "title": "string",
        //       "url": "string",
        //       "administrator": "string"
        //     }, ...
        //   ],
        //   "janghak_notice": [
        //     {
        //       "title": "string",
        //       "url": "string",
        //       "administrator": "string"
        //     }, ...
        //   ],
        //   "haksa_notice": [
        //     {
        //       "title": "string",
        //       "url": "string",
        //       "administrator": "string"
        //     }, ...
        //   ],
        //   "schedule": [
        //     {
        //       "date": "datetime",
        //       "title": "string",
        //       "description": "string",
        //     }, ...
        //   ],
        //   "course": [
        //     {
        //       "time": "time",
        //       "course_name": "string"
        //     }, ...
        //   ],
        //   "info": {
        //     "user_name": "string",
        //     "user_code": "string"
        //   }
        // }
      } catch (error) {
        console.log(error);
      }
    };
    handleNotice();
  }, []);

  return (
    <div className={styles.article}>
      <Greeting userName={info}></Greeting>
      <Container
        noticeName="일반공지"
        date="등록일 2023.11.06."
        baseURL="https://www.dongguk.edu/article/GENERALNOTICES/list"
      >
        <h3>[카운슬링센터] 정신건강특강(4차) : 건강한 관계와 성숙한 연애</h3>
      </Container>
      <Container
        noticeName="학사공지"
        baseURL="https://www.dongguk.edu/article/HAKSANOTICE/list"
        date="등록일 2023.11.03."
      >
        <h3>2023학년도 겨울 계절학기 중앙대학교 수학 안내</h3>
      </Container>
      <Container
        noticeName="장학공지"
        baseURL="https://www.dongguk.edu/article/JANGHAKNOTICE/list"
        date="등록일 2023.11.02."
      >
        <h3>2024 북한이탈청소년 장학생 선발안내</h3>
      </Container>
      <Container
        noticeName="학사일정"
        baseURL="https://www.dongguk.edu/schedule/detail?schedule_info_seq=22"
      >
        <table>
          <tbody>
            <tr>
              <td>2023.11.13. ~ 2023.11.24.</td>
              <td>재입학 신청</td>
            </tr>
            <tr>
              <td>2023.11.15. ~ 2023.11.17.</td>
              <td>겨울 계절학기 수강신청</td>
            </tr>
            <tr>
              <td>2023.11.17.</td>
              <td>학기 3/4 기준일</td>
            </tr>
          </tbody>
        </table>
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
