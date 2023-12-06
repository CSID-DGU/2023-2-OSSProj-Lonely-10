package ossproj.lonely.DGU.Portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ossproj.lonely.DGU.Portal.domain.Course;
import ossproj.lonely.DGU.Portal.domain.Enrollment;
import ossproj.lonely.DGU.Portal.domain.Registration;

import java.util.List;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    @Query("SELECT r.course FROM Registration r WHERE r.user.userCode = :userCode")
    List<Course> findCoursesByUserCode(@Param("userCode") String userCode);

    @Query("SELECT r FROM Registration r WHERE r.user.userCode = :userCode AND r.course.courseCode = :courseCode")
    Registration findByUserCodeAndCourseCode(@Param("userCode") String userCode, @Param("courseCode") String courseCode);
}
