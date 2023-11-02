package ossproj.lonely.DGU.Portal.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ossproj.lonely.DGU.Portal.domain.CourseInfo;
import ossproj.lonely.DGU.Portal.repository.CourseInfoRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class CourseInfoService {
    private final CourseInfoRepository courseInfoRepository;

    @Transactional
    public void save(CourseInfo courseInfo) {
        courseInfoRepository.save(courseInfo);
    }
}
