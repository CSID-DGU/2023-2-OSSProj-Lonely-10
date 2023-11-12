package ossproj.lonely.DGU.Portal.facade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ossproj.lonely.DGU.Portal.domain.Course;
import ossproj.lonely.DGU.Portal.domain.Enrollment;
import ossproj.lonely.DGU.Portal.domain.User;
import ossproj.lonely.DGU.Portal.dto.enrollment.response.GetCourseResponseDto;
import ossproj.lonely.DGU.Portal.dto.enrollment.response.GetEnrollResponseDto;
import ossproj.lonely.DGU.Portal.dto.main.MainComponentDto;
import ossproj.lonely.DGU.Portal.service.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    public GetCourseResponseDto getCourseByCourseName(String courseName) {
        log.info("courseName: {}", courseName);
        return GetCourseResponseDto.builder()
                .course(courseService.getCourseByCourseName(courseName))
                .build();
    }

    public GetCourseResponseDto getCourseByCourseCode(String courseCode) {
        log.info("courseCode: {}", courseCode);
        return GetCourseResponseDto.builder()
                .course(courseService.getCourseByCourseCode(courseCode))
                .build();
    }

    public GetCourseResponseDto getCourseByProfessor(String professor) {
        log.info("professor: {}", professor);
        return GetCourseResponseDto.builder()
                .course(courseService.getCourseByProfessor(professor))
                .build();
    }

    public void postEnroll(String userCode, String courseCode) {
        User user = userService.findByUserCode(userCode);
        Course course = courseService.findByCourseCode(courseCode);

        enrollmentService.save(Enrollment.builder()
                .user(user)
                .course(course)
                .build());
    }

    public void deleteEnroll(String userCode, String courseCode) {
        User user = userService.findByUserCode(userCode);
        Course course = courseService.findByCourseCode(courseCode);

        enrollmentService.delete(Enrollment.builder()
                .user(user)
                .course(course)
                .build());
    }

    public GetEnrollResponseDto getEnroll(String userCode) {
        List<Course> courseList = enrollmentService.getCourseByUserCode(userCode);
        log.info("courseList: {}", courseList);
        List<GetEnrollResponseDto.EnrollDto> enrollDtoList =
                courseList.stream()
                        .map(course ->
                                GetEnrollResponseDto.EnrollDto.builder()
                                        .courseName(course.getCourseName())
                                        .courseCode(course.getCourseCode())
                                        .professor(course.getProfessor())
                                        .build()
                        ).collect(Collectors.toList());
        return GetEnrollResponseDto.builder()
                .enrollList(enrollDtoList)
                .build();
    }
}
