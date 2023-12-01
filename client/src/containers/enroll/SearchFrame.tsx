"use client";
import { useState } from "react";
import styles from "./search.module.css";
import axios from "axios";

interface classProps {
  online: boolean;
  course_name: string;
  course_code: string;
  professor: string;
  is_online: boolean;
}

const SearchFrame = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [classData, setClassData] = useState<classProps[]>([]);
  const auth = localStorage.getItem("Authorization");

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/course",
        {
          type: selectedOption,
          search: searchTerm,
        },
        {
          headers: {
            Authorization: auth,
          },
        }
      );
      setClassData(response.data.course);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={styles.searchContainer}>
        <select
          onChange={(e) => setSelectedOption(e.target.value)}
          className={styles.select}
        >
          <option value="">과목 검색 선택</option>
          <option value="course_name">교과목</option>
          <option value="professor">교수명</option>
          <option value="course_code">강좌번호</option>
        </select>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.inputBox}
        />

        <button onClick={handleSearch} className={styles.button}>
          검색
        </button>
      </div>
      <table>
        <tbody>
          {classData &&
            classData.map((classInfo) => (
              <tr>
                <td>{classInfo.course_name}</td>
                <td>{classInfo.professor}</td>
                <td>{classInfo.course_code}</td>
                <button className={styles.button}>수강 신청</button>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchFrame;
