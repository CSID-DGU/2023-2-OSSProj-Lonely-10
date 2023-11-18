package ossproj.lonely.DGU.Portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ossproj.lonely.DGU.Portal.domain.Score;

import java.util.List;

public interface ScoreRepository extends JpaRepository<Score, Long> {
    @Query("SELECT a FROM Score a WHERE a.enrollment.user.userCode = :userCode AND a.enrollment.course.courseCode = :courseCode")
    List<Score> findScoreByUserCodeAndCourseCode(String userCode, String courseCode);
}
