package ossproj.lonely.DGU.Portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ossproj.lonely.DGU.Portal.domain.CourseInfo;

import java.util.List;

public interface CourseInfoRepository extends JpaRepository<CourseInfo, Long> {
    List<CourseInfo> findByCourseCode(String courseCode);
}
