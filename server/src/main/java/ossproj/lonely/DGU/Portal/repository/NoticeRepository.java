package ossproj.lonely.DGU.Portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ossproj.lonely.DGU.Portal.domain.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
}
