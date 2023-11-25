package ossproj.lonely.DGU.Portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ossproj.lonely.DGU.Portal.domain.Course;
import ossproj.lonely.DGU.Portal.domain.Enrollment;
import ossproj.lonely.DGU.Portal.domain.User;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    @Query("SELECT e.course FROM Enrollment e WHERE e.user.userCode = :userCode")
    List<Course> findCoursesByUserCode(@Param("userCode") String userCode);
}
