package ossproj.lonely.DGU.Portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ossproj.lonely.DGU.Portal.domain.Attendance;
import ossproj.lonely.DGU.Portal.domain.Enrollment;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    @Query("select a from Attendance a where a.enrollment = :enrollment")
    List<Attendance> findAttendanceByEnrollment(@Param("enrollment") Enrollment enrollment);
}
