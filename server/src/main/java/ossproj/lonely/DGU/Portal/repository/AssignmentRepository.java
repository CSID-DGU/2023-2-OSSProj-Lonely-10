package ossproj.lonely.DGU.Portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ossproj.lonely.DGU.Portal.domain.Assignment;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    @Query("SELECT a FROM Assignment a WHERE a.course.courseCode = :courseCode")
    List<Assignment> findByCourseCode(String courseCode);
}
