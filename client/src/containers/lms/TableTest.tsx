"use client";

import React from "react";
import styles from "./table.module.css";
import { DATA1 } from "./data";

interface RowData {
  header: string;
  cells: string[];
}

const TableTest = () => {
  // const data = DATA1.map((value, index) => (
  //   <tr key={index}>
  //     <>
  //       <th className={styles.tableHead}>{value[0]}</th>
  //       <input value={value[1]} className={styles.tableData} />
  //     </>
  //     <>
  //       <th className={styles.tableHead}>{value[0]}</th>
  //       <input value={value[1]} className={styles.tableData} />
  //     </>
  //   </tr>
  // ));

  return (
    <div className={styles.tableContainer}>
      <h3>학적기본</h3>
      <table>
        <tbody>
          <tr>
            <th className={styles.tableHead}>캠퍼스</th>
            <input value={"서울캠퍼스"} className={styles.tableData} />
            <th className={styles.tableHead}>성명</th>
            <input value={"박세호"} className={styles.tableData} />
          </tr>
          <tr>
            <th className={styles.tableHead}>생년월일</th>
            <input value={"2000-03-23"} className={styles.tableData} />
            <th className={styles.tableHead}>성별</th>
            <input value={"남"} className={styles.tableData} />
          </tr>
        </tbody>
      </table>
      <h3>학적 변동 및 등록 정보</h3>
      <table>
        <tbody>
          <tr>
            <th className={styles.tableHead}>교과과정이수년도</th>
            <input
              type="text"
              disabled
              value={"2019"}
              className={styles.tableData}
            />
            <th className={styles.tableHead}>전과여부</th>
            <input
              type="text"
              disabled
              value={"X"}
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
            <th className={styles.tableHead}>휴학학기수</th>
            <input
              type="text"
              disabled
              value={"4"}
              className={styles.tableData}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default TableTest;
