package ossproj.lonely.DGU.Portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ossproj.lonely.DGU.Portal.domain.Attendance;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    @Query("SELECT a FROM Attendance a WHERE a.enrollment.course.courseCode = :courseCode AND a.enrollment.user.userCode = :userCode")
    List<Attendance> findAttendanceByCourseCodeAndUserCode(String courseCode, String userCode);
}
