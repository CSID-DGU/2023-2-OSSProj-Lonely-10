package ossproj.lonely.DGU.Portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ossproj.lonely.DGU.Portal.domain.Attendance;
import ossproj.lonely.DGU.Portal.domain.Enrollment;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findAttendanceByEnrollment(Enrollment enrollment);
}
