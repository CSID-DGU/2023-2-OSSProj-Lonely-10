"use client";

import Button from "@/components/Button";
import styled from "styled-components";
import Greeting from "@/components/Greeting";
import SubNav from "@/components/SubNav";
import styles from "./styles.module.css";

import { useGlobalContext } from "@/context/userContext";
import { useEffect, useState } from "react";
import axios from "axios";

const CHEADERS = [
  {
    text: "학기",
    value: "year-semester",
  },
  {
    text: "교과목명",
    value: "name",
  },
  {
    text: "성적",
    value: "score",
  },
];
// const headerKey = CHEADERS.map((header) => header.value);
interface userProps {
  user_name: string;
  user_code: string;
  email: string;
  department: string;
  major: string;
  semester: string;
  phone_number: string;
}

interface gradeProps {
  course_name: string;
  semester: string;
  score: string;
}

const Grade = () => {
  const { userId } = useGlobalContext();
  const [userData, setUserData] = useState<userProps>();
  const [userGrade, setUserGrade] = useState<gradeProps[]>([]);
  const auth = localStorage.getItem("Authorization");
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const infoRes = await axios.get(`/api/v1/info/${userId}`, {
          headers: {
            Authorization: auth,
          },
          withCredentials: true,
        });
        const gradeRes = await axios.get(`/api/v1/grade/${userId}`, {
          headers: {
            Authorization: auth,
          },
          withCredentials: true,
        });

        setUserData(infoRes.data);
        setUserGrade(gradeRes.data.grade);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, []);
  return (
    <div className={styles.layout}>
      <div className={styles.leftFrame}>
        <Greeting></Greeting>
        <SubNav>
          <Button link={`/lms/${userId}`}>학적조회</Button>
          <Button link={`/lms/grade/${userId}`}>성적조회</Button>
        </SubNav>
      </div>
      <div className={styles.frame}>
        <Content>
          <QRContainer></QRContainer>
          <Title>성적조회</Title>
          <UserInfo>
            <UserContainer>
              <SubTitle>성명</SubTitle>
              <Info>{userData?.user_name}</Info>
            </UserContainer>
            <UserContainer>
              <SubTitle>학번</SubTitle>
              <Info>{userId}</Info>
            </UserContainer>
            <UserContainer>
              <SubTitle>학기</SubTitle>
              <Info>{userData?.semester}</Info>
            </UserContainer>
            <UserContainer>
              <SubTitle>대학</SubTitle>
              <Info>{userData?.department}</Info>
            </UserContainer>
            <UserContainer>
              <SubTitle>주전공</SubTitle>
              <Info>{userData?.major}</Info>
            </UserContainer>
            <UserContainer>
              <SubTitle>복수전공</SubTitle>
              <Info>데이터사이언스</Info>
            </UserContainer>
          </UserInfo>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  {CHEADERS.map((header) => (
                    <TH key={header.text}>{header.text}</TH>
                  ))}
                </tr>
              </thead>
              <tbody>
                {userGrade &&
                  userGrade.map((data, index) => (
                    <tr key={index}>
                      <TD>{data.semester}</TD>
                      <TD>{data.course_name}</TD>
                      <TD>{data.score}</TD>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </TableContainer>
        </Content>
      </div>
    </div>
  );
};

// const Button = styled.button`
//   position: fixed;
//   bottom: 30px;
//   right: 30px;
//   border: none;
//   border-radius: 5px;
//   padding: 20px;
//   box-shadow: 0 2px 2px #a9a9a9;
//   background-color: white;
//   cursor: pointer;
//   transition: 1s;
//   &:hover {
//     color: white;
//   }
// `;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 18pt;
  font-weight: bold;
  margin-top: 10px;
  text-decoration: underline;
`;

const QRContainer = styled.div`
  margin-left: 500px;
`;

const UserInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 50px;
  width: 500px;
`;

const UserContainer = styled.div`
  display: flex;

  border: 1px solid black;
  border-spacing: 0px;
  border-collapse: collapse;
  align-items: center;
  :nth-of-type(2) {
    border-left: none;
  }
  :nth-of-type(3) {
    border-left: none;
  }
  :nth-of-type(4) {
    border-top: none;
  }
  :nth-of-type(5) {
    border-left: none;
    border-top: none;
  }
`;

const SubTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  background-color: #a9a9a9;
  width: 80px;
  height: 25px;
  line-height: 25px;
`;

const Info = styled.div`
  font-size: 8pt;
  margin-left: 5px;
`;

const TableContainer = styled.div`
  height: 500px;
`;

const Table = styled.table`
  border: 1px solid black;
  margin-top: 20px;
  width: 500px;
  border-spacing: 0px;
  border-collapse: collapse;
  font-size: 10pt;
  height: 400px;
`;

const TH = styled.th`
  border: 1px solid black;
  height: 30px;
  background-color: #a9a9a9;
`;

const TD = styled.td`
  text-align: center;
  border-left: 1px solid black;
  /* table-layout: fixed; */
  /* overflow: hidden; */
  height: 20px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 80px;
  border-top: 1px solid black;
  justify-content: space-between;
`;

const Img = styled.img`
  width: 90px;
  margin: 0 10px;
`;

const Print = styled.div`
  font-size: 6pt;
  margin: 0 5px;
`;

export default Grade;
