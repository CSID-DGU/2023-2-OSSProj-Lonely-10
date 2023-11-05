package ossproj.lonely.DGU.Portal.facade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ossproj.lonely.DGU.Portal.dto.main.MainComponentDto;
import ossproj.lonely.DGU.Portal.dto.main.sub.CourseDto;
import ossproj.lonely.DGU.Portal.service.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AggregationFacade {
    private final UserService userService;
    private final TodoService todoService;
    private final ScoreService scoreService;
    private final ScheduleService scheduleService;
    private final NoticeService noticeService;
    private final GradeService gradeService;
    private final EnrollmentService enrollmentService;
    private final CourseService courseService;
    private final AssignmentService assignmentService;
    private final AttendanceService attendanceService;
    private final CourseInfoService courseInfoService;
    private final AnnouncementService announcementService;

    public MainComponentDto getMainComponent(String userCode) {
        return MainComponentDto.builder()
                .Info(userService.getInfo(userCode))
                .GeneralNotice(noticeService.getGeneralNotice())
                .ScholarshipNotice(noticeService.getScholarshipNotice())
                .HaksaNotice(noticeService.getHaksaNotice())
                .Schedule(scheduleService.getSchedule())
                .Course(courseService.getCourse())
                .build();
    }
}
