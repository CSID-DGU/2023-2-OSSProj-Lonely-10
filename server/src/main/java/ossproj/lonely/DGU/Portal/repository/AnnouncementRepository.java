package ossproj.lonely.DGU.Portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ossproj.lonely.DGU.Portal.domain.Announcement;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
}
