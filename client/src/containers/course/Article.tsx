"use client";
import Greeting from "@/components/Greeting";
import Container from "@/components/Container";
import Todo from "@/components/Todo";
import Link from "next/link";
import styles from "./styles.module.css";
import axios from "axios";

import { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/userContext";
import { getToday } from "./getTodayClass";

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

interface todoProps {
  content: string;
  status: string;
  created_at: string;
}

interface todayClassProps {
  courseName: string;
  time: string;
  classroom: string;
}

type CheckboxChangeEvent = React.ChangeEvent<HTMLInputElement>;

const Article = () => {
  const { userId } = useGlobalContext();
  const auth = localStorage.getItem("Authorization");
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [CourseInfo, setCourseInfo] = useState<courseProps[]>([]);
  const [todoInfo, setTodoInfo] = useState<todoProps[]>([]);
  const [todoFlag, setTodoFlag] = useState(false);
  const [todoList, setTodoList] = useState<string[]>([]);
  const [todoItem, setTodoItem] = useState("");
  const [todayClass, setTodayClass] = useState<todayClassProps[]>([]);
  useEffect(() => {
    const getCourse = async () => {
      const res = await axios.get(`/api/v1/lms/${userId}`, {
        headers: {
          Authorization: auth,
        },
        withCredentials: true,
      });
      setCourseInfo(res.data.user_course);
      setTodoInfo(res.data.todo);
      const today = getToday(res.headers.date, res.data.user_course);
      setTodayClass(today);
    };
    getCourse();
  }, [todoList, checkedItems]);

  const registerTodo = async () => {
    await axios.post(
      "/api/v1/todos",
      {
        user_code: userId,
        content: todoItem,
      },
      {
        headers: {
          Authorization: auth,
        },
        withCredentials: true,
      }
    );
    const list = [...todoList, todoItem];
    setTodoList(list);
    setTodoItem("");
    setTodoFlag(false);
  };

  const addTodo = () => {
    setTodoFlag(!todoFlag);
  };

  const handleCheck = async (index: number, e: CheckboxChangeEvent) => {
    if (e.target.checked === true) {
      await axios.post(`/api/v1/todos/${index + 1}`, undefined, {
        headers: {
          Authorization: auth,
        },
        withCredentials: true,
      });
    }
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = e.target.checked;
    setCheckedItems(newCheckedItems);
  };

  return (
    <div className={styles.article}>
      <Greeting width="30vw"></Greeting>
      {CourseInfo &&
        CourseInfo.map((data) => (
          <Container
            noticeName={data.course_name}
            baseURL="https://eclass.dongguk.edu/"
          >
            <p>{data.professor}</p>
          </Container>
        ))}
      <Container noticeName="오늘의 수업 " baseURL={`/home/${userId}`}>
        {todayClass &&
          todayClass.map((data) => (
            <table className={styles.tableStyle}>
              <tbody>
                <tr>
                  <td>{data.courseName}</td>
                  <td>{data.time}</td>
                  <td>{data.classroom}</td>
                </tr>
              </tbody>
            </table>
          ))}
      </Container>
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
            {todoInfo &&
              todoInfo.map((todo, index) => (
                <tr
                  key={index}
                  className={todo.status === "completed" ? styles.complete : ""}
                >
                  <td>
                    <input
                      type="checkbox"
                      disabled={todo.status === "completed" ? true : false}
                      onChange={(e) => handleCheck(index, e)}
                    />
                  </td>
                  <td>{todo.content}</td>
                  {/* 맨 앞에는 완료 체크 박스, 수정 및 삭제 가능한 div에 spcae around 두기  */}
                  {/* index로 url 보낼때 스택처럼 기억해놔야함... */}
                </tr>
              ))}
          </tbody>
        </table>
      </Todo>
    </div>
  );
};

export default Article;
