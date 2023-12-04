"use client";
import Greeting from "@/components/Greeting";
import Container from "@/components/Container";
import Todo from "@/components/Todo";
import Link from "next/link";
import styles from "./styles.module.css";
import { useEffect, useState, useRef } from "react";
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
  const [todoFlag, setTodoFlag] = useState(false);
  const [todoList, setTodoList] = useState<string[]>([]);
  const [todoItem, setTodoItem] = useState("");
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

  const registerTodo = () => {
    const list = [...todoList, todoItem];
    setTodoList(list);
    setTodoItem("");
    setTodoFlag(false);
  };

  const addTodo = () => {
    setTodoFlag(!todoFlag);
  };

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
      <Container noticeName="오늘의 수업 " baseURL="/home"></Container>
      <Todo noticeName="오늘의 할일">
        <div className={styles.subjectStyle}>
          <span className={styles.titleStyle}>
            <Link className={styles.title} href={""}>
              오늘의 할 일
            </Link>
          </span>
          <span>
            <button className={styles.plusButton} onClick={addTodo}>
              {todoFlag ? "x" : "+"}
            </button>
          </span>
        </div>
        <hr />
        {todoFlag && (
          <div>
            <input
              className={styles.inputBox}
              onChange={(e) => {
                setTodoItem(e.target.value);
              }}
            ></input>
            <button className={styles.orangeButton} onClick={registerTodo}>
              등록
            </button>
          </div>
        )}
        <table>
          <tbody>
            {todoList &&
              todoList.map((item, index) => (
                <tr key={index}>
                  <td>{item}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Todo>
    </div>
  );
};

export default Article;
