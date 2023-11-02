package ossproj.lonely.DGU.Portal.facade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ossproj.lonely.DGU.Portal.service.*;

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
}
