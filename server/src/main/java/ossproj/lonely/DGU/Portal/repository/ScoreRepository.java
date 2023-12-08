package ossproj.lonely.DGU.Portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ossproj.lonely.DGU.Portal.domain.Enrollment;
import ossproj.lonely.DGU.Portal.domain.Score;

import java.util.List;

public interface ScoreRepository extends JpaRepository<Score, Long> {
    @Query("select s from Score s where s.enrollment = :enrollment")
    List<Score> findScoreByEnrollment(@Param("enrollment") Enrollment enrollment);
}
