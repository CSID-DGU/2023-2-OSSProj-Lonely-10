package ossproj.lonely.DGU.Portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ossproj.lonely.DGU.Portal.domain.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
}
