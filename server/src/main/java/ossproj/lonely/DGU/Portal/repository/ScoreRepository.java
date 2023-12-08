package ossproj.lonely.DGU.Portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ossproj.lonely.DGU.Portal.domain.Enrollment;
import ossproj.lonely.DGU.Portal.domain.Score;

import java.util.List;

public interface ScoreRepository extends JpaRepository<Score, Long> {
    List<Score> findScoreByEnrollment(Enrollment enrollment);
}
