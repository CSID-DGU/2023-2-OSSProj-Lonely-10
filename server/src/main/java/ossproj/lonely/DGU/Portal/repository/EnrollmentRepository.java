package ossproj.lonely.DGU.Portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ossproj.lonely.DGU.Portal.domain.Enrollment;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
}
