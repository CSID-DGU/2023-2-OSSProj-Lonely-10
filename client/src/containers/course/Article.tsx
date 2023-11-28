import Greeting from "@/components/Greeting";
import Container from "@/components/Container";
import styles from "./styles.module.css";

const Article = () => {
  return (
    <div className={styles.article}>
      <Greeting
        userName={"박세호"}
        userCode="2019112127"
        width="30vw"
      ></Greeting>
      <Container
        noticeName="데이터사이언스"
        baseURL="https://www.dongguk.edu/article/GENERALNOTICES/list"
      >
        <h3>내용</h3>
      </Container>
      <Container
        noticeName="공학선형대수학"
        baseURL="https://www.dongguk.edu/article/HAKSANOTICE/list"
      >
        <h3>내용</h3>
      </Container>
      <Container
        noticeName="오픈소스소프트웨어프로젝트"
        baseURL="https://www.dongguk.edu/article/JANGHAKNOTICE/list"
      >
        <h3>내용</h3>
      </Container>
      <Container
        noticeName="딥러닝"
        baseURL="https://www.dongguk.edu/schedule/detail?schedule_info_seq=22"
      >
        <h3>내용</h3>
      </Container>
      <Container
        noticeName="일본어"
        baseURL="https://www.dongguk.edu/schedule/detail?schedule_info_seq=22"
      >
        <h3>내용</h3>
      </Container>
      <Container
        noticeName="EAS"
        baseURL="https://www.dongguk.edu/schedule/detail?schedule_info_seq=22"
      >
        <h3>내용</h3>
      </Container>
      <Container
        noticeName="머신러닝과데이터사이언스"
        baseURL="https://www.dongguk.edu/schedule/detail?schedule_info_seq=22"
      >
        <h3>내용</h3>
      </Container>
      <Container noticeName="오늘의 수업 " baseURL="/home">
        <table>
          <tbody>
            <tr>
              <td>10:30</td>
              <td>데이터사이언스개론</td>
            </tr>
            <tr>
              <td>13:00</td>
              <td>오픈소스소프트웨어프로젝트</td>
            </tr>
            <tr>
              <td>15:00</td>
              <td>딥러닝</td>
            </tr>
          </tbody>
        </table>
      </Container>
      <Container noticeName="오늘의 할일 " baseURL="/home">
        <table>
          <tbody>
            <tr>
              <td>10:30</td>
              <td>데이터사이언스개론</td>
            </tr>
            <tr>
              <td>13:00</td>
              <td>오픈소스소프트웨어프로젝트</td>
            </tr>
            <tr>
              <td>15:00</td>
              <td>딥러닝</td>
            </tr>
          </tbody>
        </table>
      </Container>
    </div>
  );
};

export default Article;
