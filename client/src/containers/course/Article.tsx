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
  course_code: string;
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

interface attendaceProps {
  date: string;
  status: string;
}

interface anouncementProps {
  title: string;
  content: string;
  writer: string;
  created_at: string;
}

interface assignmentProps {
  title: string;
  content: string;
  duration: string;
  created_at: string;
}

interface courseDetail {
  course_id: string;
  course_code: string;
  course_name: string;
  professor: string;
  attendance: attendaceProps[];
  announcement: anouncementProps[];
  assignment: assignmentProps[];
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
  const [courseDetail, setCourseDetail] = useState<courseDetail[]>([]);

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
    const getDetail = () => {
      CourseInfo.forEach(async (data) => {
        const response = await axios.get(
          `/api/v1/lms/${userId}/course/${data.course_code}`,
          {
            headers: {
              Authorization: auth,
            },
            withCredentials: true,
          }
        );
        const prevData = [...courseDetail];
        prevData.push(response.data);
        setCourseDetail(prevData);
      });
    };
    getCourse();
    getDetail();
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

  const renamePlace = (input: string): string => {
    const removePattern = (input: string): string => {
      return input.replace(/\([^)]*\)/g, "").trim();
    };
    return removePattern(input);
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
        CourseInfo.map((data, index) => (
          <Container
            noticeName={data.course_name}
            baseURL="https://eclass.dongguk.edu/"
          >
            {courseDetail[index] && (
              <table>
                <tbody>
                  {/* 어떤 인덱스 속성을 통해, 지금 보여주는 컴포넌트를 결정해야함. */}
                  {courseDetail[index].announcement.map((something) => (
                    <tr>
                      <td>{something.title}</td>
                      <td>{something.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Container>
        ))}
      <Container noticeName="오늘의 수업 " baseURL={`/home/${userId}`}>
        <table className={styles.tableStyle}>
          <tbody>
            {todayClass &&
              todayClass.map((data) => (
                <tr>
                  <td>{data.courseName}</td>
                  <td>{data.time}</td>
                  <td>{`${
                    data.classroom && renamePlace(data.classroom)
                  } 강의실`}</td>
                </tr>
              ))}
          </tbody>
        </table>
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
