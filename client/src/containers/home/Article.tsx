import Container from "@/components/Container";
import styles from "./article.module.css";

const Article = () => {
  return (
    <div className={styles.article}>
      <Container noticeName="user" contents="test"></Container>
      <Container noticeName="일반공지" contents="test"></Container>
      <Container noticeName="학사공지" contents="test"></Container>
      <Container noticeName="장학공지" contents="test"></Container>
      <Container noticeName="학사일정" contents="test"></Container>
      <Container noticeName="오늘의 수업" contents="test"></Container>
    </div>
  );
};

export default Article;
