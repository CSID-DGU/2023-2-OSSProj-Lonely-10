"use client";
import { useGlobalContext } from "@/context/userContext";

import React, { useEffect, useState } from "react";
import styles from "./table.module.css";
import axios from "axios";

interface userProps {
  user_name: string;
  user_code: string;
  email: string;
  department: string;
  major: string;
  semester: string;
  phone_number: string;
}

const TableArticle = () => {
  const auth = localStorage.getItem("Authorization");
  const { userId } = useGlobalContext();
  const [userData, setUserData] = useState<userProps>();
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(`/api/v1/info/${userId}`, {
          headers: {
            Authorization: auth,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, []);

  return (
    <div className={styles.tableContainer}>
      <h3>학적기본</h3>
      <table>
        <tbody>
          <tr>
            <th className={styles.tableHead}>캠퍼스</th>
            <input value={"서울캠퍼스"} className={styles.tableData} />
            <th className={styles.tableHead}>성명</th>
            <input value={userData?.user_name} className={styles.tableData} />
          </tr>
          <tr>
            <th className={styles.tableHead}>전화번호</th>
            <input
              value={userData?.phone_number}
              className={styles.tableData}
            />
            <th className={styles.tableHead}>학번</th>
            <input value={userData?.user_code} className={styles.tableData} />
          </tr>
          <tr>
            <th className={styles.tableHead}>이메일</th>
            <input value={userData?.email} className={styles.tableData} />
            <th className={styles.tableHead}>학년</th>
            <input value={"3"} className={styles.tableData} />
          </tr>
        </tbody>
      </table>
      <h3>학적 변동 및 등록 정보</h3>
      <table>
        <tbody>
          <tr>
            <th className={styles.tableHead}>단과대학</th>
            <input
              type="text"
              disabled
              value={userData?.department}
              className={styles.tableData}
            />
            <th className={styles.tableHead}>학과/학부</th>
            <input
              type="text"
              disabled
              value={userData?.major}
              className={styles.tableData}
            />
            <th className={styles.tableHead}>전과신청횟수</th>
            <input
              type="text"
              disabled
              value={"0"}
              className={styles.tableData}
            />
          </tr>
          <tr>
            <th className={styles.tableHead}>최종학적변동</th>
            <input
              type="text"
              disabled
              value={"복학"}
              className={styles.tableData}
            />
            <th className={styles.tableHead}>최종변동일자</th>
            <input
              type="text"
              disabled
              value={"2022-09"}
              className={styles.tableData}
            />
            <th className={styles.tableHead}>등록학기</th>
            <input
              type="text"
              disabled
              value={userData?.semester}
              className={styles.tableData}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableArticle;
