"use client";
import Greeting from "@/components/Greeting";
import Container from "@/components/Container";
import styles from "./article.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

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
      <Container noticeName="일반공지">{generallNotice}</Container>
      <Container noticeName="학사공지">{haksaNotice}</Container>
      <Container noticeName="장학공지">{janghakNotice}</Container>
      <Container noticeName="학사일정">{scheduleNotice}</Container>
      <Container noticeName="오늘의 수업"></Container>
    </div>
  );
};

export default Article;
