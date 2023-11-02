package ossproj.lonely.DGU.Portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ossproj.lonely.DGU.Portal.domain.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
