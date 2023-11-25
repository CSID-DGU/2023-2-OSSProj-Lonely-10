"use client";

import styled from "styled-components";
import logo from "../../assets/img/dgu-black-logo.png";
import { useEffect, useState } from "react";
import makePdf from "./makePdf";

const CHEADERS = [
  {
    text: "년도/학기",
    value: "year-semester",
  },
  {
    text: "교과목명",
    value: "name",
  },
  {
    text: "학점",
    value: "grade",
  },
  {
    text: "성적",
    value: "score",
  },
];
const headerKey = CHEADERS.map((header) => header.value);

const Grade = () => {
  return (
    <div className="div_container">
      <div className="div_paper">
        <Content>
          <QRContainer></QRContainer>
          <Title>금학기 성적조회</Title>
          <UserInfo>
            <UserContainer>
              <SubTitle>성명</SubTitle>
              <Info>박세호</Info>
            </UserContainer>
            <UserContainer>
              <SubTitle>학번</SubTitle>
              <Info>2019112127</Info>
            </UserContainer>
            <UserContainer>
              <SubTitle>학년</SubTitle>
              <Info>3학년</Info>
            </UserContainer>
            <UserContainer>
              <SubTitle>대학</SubTitle>
              <Info>공과대학</Info>
            </UserContainer>
            <UserContainer>
              <SubTitle>주전공</SubTitle>
              <Info>정보통신공학과</Info>
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
                <tr>
                  <TD>2023-2</TD>
                  <TD>오픈소스소프트웨어프로젝트</TD>
                  <TD>3</TD>
                  <TD>미공개</TD>
                </tr>
                <tr>
                  <TD>2023-2</TD>
                  <TD>딥러닝</TD>
                  <TD>3</TD>
                  <TD>A+</TD>
                </tr>
                <tr>
                  <TD>2023-2</TD>
                  <TD>데이터사이언스개론</TD>
                  <TD>3</TD>
                  <TD>A+</TD>
                </tr>
              </tbody>
            </Table>
          </TableContainer>
        </Content>
      </div>
    </div>
  );
};

const Button = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  border: none;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 2px #a9a9a9;
  background-color: white;
  cursor: pointer;
  transition: 1s;
  &:hover {
    color: white;
  }
`;

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
