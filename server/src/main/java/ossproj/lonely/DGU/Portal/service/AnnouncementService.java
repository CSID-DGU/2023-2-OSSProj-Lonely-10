package ossproj.lonely.DGU.Portal.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ossproj.lonely.DGU.Portal.domain.Announcement;
import ossproj.lonely.DGU.Portal.repository.AnnouncementRepository;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AnnouncementService {
    private final AnnouncementRepository announcementRepository;

    @Transactional
    public void save(Announcement announcement) {
        announcementRepository.save(announcement);
    }

    @Transactional
    public List<Announcement> getAnnouncementByCourseCode(String courseCode) {
        return announcementRepository.findByCourseCode(courseCode);
    }
}
