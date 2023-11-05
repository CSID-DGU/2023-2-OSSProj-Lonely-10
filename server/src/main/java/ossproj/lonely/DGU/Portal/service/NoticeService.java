package ossproj.lonely.DGU.Portal.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ossproj.lonely.DGU.Portal.domain.Notice;
import ossproj.lonely.DGU.Portal.dto.main.sub.NoticeDto;
import ossproj.lonely.DGU.Portal.repository.NoticeRepository;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeRepository noticeRepository;

    @Transactional
    public void save(Notice notice) {
        noticeRepository.save(notice);
    }

    @Transactional
    public List<NoticeDto> getGeneralNotice() {
        List<Notice> notices = noticeRepository.findByType("일반");
        return notices.stream()
                .map(notice -> new NoticeDto(notice.getTitle(), notice.getUrl(), notice.getAdministrator()))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<NoticeDto> getScholarshipNotice() {
        List<Notice> notices = noticeRepository.findByType("장학");
        return notices.stream()
                .map(notice -> new NoticeDto(notice.getTitle(), notice.getUrl(), notice.getAdministrator()))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<NoticeDto> getHaksaNotice() {
        List<Notice> notices = noticeRepository.findByType("학사");
        return notices.stream()
                .map(notice -> new NoticeDto(notice.getTitle(), notice.getUrl(), notice.getAdministrator()))
                .collect(Collectors.toList());
    }
}
