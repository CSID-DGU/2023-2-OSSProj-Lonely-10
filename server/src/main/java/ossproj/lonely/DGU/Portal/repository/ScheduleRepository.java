package ossproj.lonely.DGU.Portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ossproj.lonely.DGU.Portal.domain.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
}
