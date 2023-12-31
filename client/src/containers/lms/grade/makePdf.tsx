import styled from "styled-components";

const QrInfo = () => {
  return (
    <Container>
      <Title>2023학년도 1학기 성적</Title>
      <GradeContainer>
        <DataContainer>
          <Name>교과목명</Name>
          <Data>테스트</Data>
        </DataContainer>
        <DataContainer>
          <Name>담당교원</Name>
          <Data>테스트</Data>
        </DataContainer>
        <DataContainer>
          <Name>학점</Name>
          <Data>테스트</Data>
        </DataContainer>
        <DataContainer>
          <Name>성적</Name>
          <Data>테스트</Data>
        </DataContainer>
      </GradeContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  scroll-behavior: auto;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 14px;
  align-self: flex-start;
  margin-left: 10vw;
  margin-bottom: 1vh;
`;

const GradeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  border: 1px solid #e6e8e7;
  width: 80vw;
  height: 60vh;
  overflow: scroll;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  border-bottom: 1px solid #e6e8e7;
  align-items: flex-start;
  justify-content: space-between;
  margin: 20px;
`;

const Name = styled.div`
  font-weight: bold;
  margin-bottom: 1vh;
  padding-top: 30px;
`;

const Data = styled.div``;

const FinalGrade = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

export default QrInfo;
