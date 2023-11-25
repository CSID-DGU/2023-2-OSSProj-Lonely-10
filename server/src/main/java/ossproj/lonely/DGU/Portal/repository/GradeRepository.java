package ossproj.lonely.DGU.Portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ossproj.lonely.DGU.Portal.domain.Grade;

import java.util.List;

public interface GradeRepository extends JpaRepository<Grade, Long> {
    @Query("SELECT g from Grade g WHERE g.user.userCode = :userCode")
    List<Grade> findByUserCode(String userCode);
}
