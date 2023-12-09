"use client";

import { useState } from "react";
import { useCourseDetailContext } from "@/context/courseDetailContext";
import styles from "./styles.module.css";
import Link from "next/link";
type ConatinerProps = {
  noticeName?: string;
  baseURL: string;
  children?: React.ReactNode;
  date?: string;
  title?: string;
  administrator?: string;
  isButton?: boolean;
  isCourse?: boolean;
  courseIndex?: number;
};

const Container = (props: ConatinerProps) => {
  const { courseDetail } = useCourseDetailContext();
  const [displayStatus, setDisplayStatus] = useState<string>("announcement");
  const getStatus = (status: string) => {
    setDisplayStatus(status);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subjectStyle}>
          <p
            className={styles.title}
            onClick={() => {
              window.open(props.baseURL);
            }}
          >
            {props.noticeName}
          </p>
          {props.isCourse && (
            <div className={styles.select}>
              <span
                className={styles.selectDetail}
                onClick={() => {
                  getStatus("announcement");
                }}
              >
                공지
              </span>
              <span
                className={styles.selectDetail}
                onClick={() => {
                  getStatus("assignment");
                }}
              >
                과제
              </span>
              <span
                className={styles.selectDetail}
                onClick={() => {
                  getStatus("attendance");
                }}
              >
                출결
              </span>
            </div>
          )}
        </div>
        <hr />

        {props.isCourse ? (
          <div className={styles.contents}>
            {courseDetail[props.courseIndex ? props.courseIndex : 0] && (
              <table>
                <tbody>
                  {displayStatus === "announcement" &&
                    courseDetail[
                      props.courseIndex ? props.courseIndex : 0
                    ].announcement.map((something) => (
                      <tr>
                        <td>{something.title}</td>
                        <td>{something.content}</td>
                      </tr>
                    ))}
                  {displayStatus === "assignment" &&
                    courseDetail[
                      props.courseIndex ? props.courseIndex : 0
                    ].assignment.map((something) => (
                      <tr>
                        <td>{something.title}</td>
                        <td>{something.content}</td>
                      </tr>
                    ))}
                  {displayStatus === "attendance" &&
                    courseDetail[
                      props.courseIndex ? props.courseIndex : 0
                    ].attendance.map((something) => (
                      <tr>
                        <td>{something.date}</td>
                        <td>{something.status}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <div className={styles.contents}>{props.children}</div>
        )}
      </div>
    </>
  );
};

export default Container;
