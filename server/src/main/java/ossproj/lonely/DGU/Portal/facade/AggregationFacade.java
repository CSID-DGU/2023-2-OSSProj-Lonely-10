package ossproj.lonely.DGU.Portal.facade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ossproj.lonely.DGU.Portal.domain.*;
import ossproj.lonely.DGU.Portal.dto.enrollment.response.GetCourseResponseDto;
import ossproj.lonely.DGU.Portal.dto.enrollment.response.GetEnrollResponseDto;
import ossproj.lonely.DGU.Portal.dto.main.MainComponentDto;
import ossproj.lonely.DGU.Portal.dto.record.response.GetAllGradeDto;
import ossproj.lonely.DGU.Portal.dto.record.response.GetBeforeGradeDto;
import ossproj.lonely.DGU.Portal.dto.record.response.GetUserInfoResponseDto;
import ossproj.lonely.DGU.Portal.dto.school.response.GetCourseDetailResponseDto;
import ossproj.lonely.DGU.Portal.dto.school.response.GetSchoolResponseDto;
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
    private final RegistrationService registrationService;

    public MainComponentDto getMainComponent(String userCode) {
        List<Course> courses = enrollmentService.getCourseByUserCode(userCode);

        return MainComponentDto.builder()
                .Info(userService.getInfo(userCode))
                .GeneralNotice(noticeService.getGeneralNotice())
                .ScholarshipNotice(noticeService.getScholarshipNotice())
                .HaksaNotice(noticeService.getHaksaNotice())
                .Schedule(scheduleService.getSchedule())
                .Course(courseService.getCourse(courses))
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

        if (enrollmentService.getCourseByUserCode(userCode).contains(course)) {
            return;
        }

        enrollmentService.save(Enrollment.builder()
                .user(user)
                .course(course)
                .build());
    }

    public void postRegister(String userCode, String courseCode) {
        User user = userService.findByUserCode(userCode);
        Course course = courseService.findByCourseCode(courseCode);

        if (registrationService.getCourseByUserCode(userCode).contains(course)) {
            return;
        }

        registrationService.save(Registration.builder()
                .user(user)
                .course(course)
                .build());
    }

    public void deleteEnroll(String userCode, String courseCode) {
        Enrollment enrollment = enrollmentService.getEnrollmentByUserCodeAndCourseCode(userCode, courseCode);
        enrollmentService.delete(enrollment);
    }

    public void deleteRegister(String userCode, String courseCode) {
        Registration registration = registrationService.getRegistrationByUserCodeAndCourseCode(userCode, courseCode);
        registrationService.delete(registration);
    }

    public GetEnrollResponseDto getAllCourse() {
        List<Course> courseList = courseService.findAllCourse();
        List<GetEnrollResponseDto.EnrollDto> enrollDtoList =
                courseList.stream()
                        .map(course ->
                                GetEnrollResponseDto.EnrollDto.builder()
                                        .courseName(course.getCourseName())
                                        .courseCode(course.getCourseCode())
                                        .professor(course.getProfessor())
                                        .build()
                        ).toList();
        return GetEnrollResponseDto.builder()
                .enrollList(enrollDtoList)
                .build();
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
                        ).toList();
        return GetEnrollResponseDto.builder()
                .enrollList(enrollDtoList)
                .build();
    }

    public GetEnrollResponseDto getRegister(String userCode) {
        List<Course> courseList = registrationService.getCourseByUserCode(userCode);
        log.info("courseList: {}", courseList);
        List<GetEnrollResponseDto.EnrollDto> enrollDtoList =
                courseList.stream()
                        .map(course ->
                                GetEnrollResponseDto.EnrollDto.builder()
                                        .courseName(course.getCourseName())
                                        .courseCode(course.getCourseCode())
                                        .professor(course.getProfessor())
                                        .build()
                        ).toList();
        return GetEnrollResponseDto.builder()
                .enrollList(enrollDtoList)
                .build();
    }

    public Long makeTodos(String userCode, String todo) {
        User user = userService.findByUserCode(userCode);
        return todoService.save(Todo.builder()
                .user(user)
                        .content(todo)
                        .createdAt(java.time.LocalDateTime.now())
                        .isCompleted(false)
                .build());
    }

    public void deleteTodo(Long todoId) {
        Todo todo = todoService.findById(todoId);
        todoService.delete(todo);
    }

    public void updateTodoContent(Long todoId, String content) {
        Todo todo = todoService.findById(todoId);
        todo.updateContent(content);
        todoService.update(todo);
    }

    public void updateTodoStatus(Long todoId) {
        Todo todo = todoService.findById(todoId);

        boolean isCompleted = todo.isCompleted();
        todo.updateIsCompleted(!isCompleted);

        todoService.update(todo);
    }

    public GetSchoolResponseDto getSchoolComponent(String userCode) {
        List<Todo> todos = todoService.findByUserCode(userCode);
        List<GetSchoolResponseDto.TodoDto> todoDtoList =
                todos.stream()
                        .map(todo -> GetSchoolResponseDto.TodoDto.builder()
                                .content(todo.getContent())
                                .createdAt(todo.getCreatedAt().toString())
                                .status(todo.isCompleted() ? "completed" : "incomplete")
                                .build())
                        .toList();

        List<Course> courses = enrollmentService.getCourseByUserCode(userCode);
        List<CourseInfo> courseInfos = new ArrayList<>();
        for (Course course : courses) {
            List<CourseInfo> tmp = courseInfoService.findByCourseCode(course.getCourseCode());
            courseInfos.addAll(tmp);
        }

        List<GetSchoolResponseDto.UserCourseDto> userCourseDtos =
                courses.stream()
                        .map(course -> {
                            List<GetSchoolResponseDto.UserScheduleDto> filteredSchedules = courseInfos.stream()
                                    .filter(courseInfo -> courseInfo.getCourseCode().equals(course.getCourseCode()))
                                    .map(courseInfo -> GetSchoolResponseDto.UserScheduleDto.builder()
                                            .time(courseInfo.getStartTime() + " ~ " + courseInfo.getEndTime())
                                            .classroom(courseInfo.getClassroom())
                                            .days(courseInfo.getDays())
                                            .build())
                                    .toList();
                            return GetSchoolResponseDto.UserCourseDto.builder()
                                    .courseName(course.getCourseName())
                                    .professor(course.getProfessor())
                                    .schedules(filteredSchedules)
                                    .build();
                        })
                        .toList();

        return GetSchoolResponseDto.builder()
                .todos(todoDtoList)
                .userCourses(userCourseDtos)
                .build();
    }

    public GetCourseDetailResponseDto getCourseDetails(String userCode, String courseCode) {
        Course course = courseService.findByCourseCode(courseCode);
        List<Attendance> attendances = attendanceService.getAttendance(userCode, courseCode);
        List<Score> scores = scoreService.getScore(userCode, courseCode);
        List<Announcement> announcements = announcementService.getAnnouncementByCourseCode(courseCode);
        List<Assignment> assignments = assignmentService.getAssignmentByCourseCode(courseCode);

        List<GetCourseDetailResponseDto.AnnouncementDto> announcementDtoList =
                announcements.stream().map(announcement -> GetCourseDetailResponseDto.AnnouncementDto.builder()
                        .title(announcement.getTitle())
                        .content(announcement.getContent())
                        .writer(announcement.getWriter())
                        .createdAt(announcement.getCreatedAt().toString())
                        .build()).toList();

        List<GetCourseDetailResponseDto.AssignmentDto> assignmentDtoList =
                assignments.stream().map(assignment -> GetCourseDetailResponseDto.AssignmentDto.builder()
                        .title(assignment.getTitle())
                        .content(assignment.getContent())
                        .duration(assignment.getDuration().toString())
                        .createdAt(assignment.getCreatedAt().toString())
                        .build()).toList();

        List<GetCourseDetailResponseDto.AttendanceDto> attendanceDtoList =
                attendances.stream().map(attendance -> GetCourseDetailResponseDto.AttendanceDto.builder()
                        .date(attendance.getDate().toString())
                        .status(attendance.getStatus())
                        .build()).toList();

        List<GetCourseDetailResponseDto.scoreDto> scoreDtoList =
                scores.stream().map(score -> GetCourseDetailResponseDto.scoreDto.builder()
                        .type(score.getType())
                        .score(String.valueOf(score.getScore()))
                        .date(score.getDate().toString())
                        .build()).toList();

        return GetCourseDetailResponseDto.builder()
                .courseId(String.valueOf(course.getId()))
                .courseCode(course.getCourseCode())
                .courseName(course.getCourseName())
                .professor(course.getProfessor())
                .attendance(attendanceDtoList)
                .score(scoreDtoList)
                .announcement(announcementDtoList)
                .assignment(assignmentDtoList)
                .build();
    }

    public GetUserInfoResponseDto getUserInfo(String userCode) {
        User user = userService.findByUserCode(userCode);
        return GetUserInfoResponseDto.builder()
                .userCode(user.getUserCode())
                .userName(user.getUserName())
                .email(user.getUserEmail())
                .semester(String.valueOf(user.getSemester()))
                .phoneNumber(user.getPhoneNumber())
                .department(user.getDepartment())
                .major(user.getMajor())
                .build();
    }

    public GetAllGradeDto getAllGrade(String userCode) {
        List<Grade> grades = gradeService.getGrade(userCode);
        return GetAllGradeDto.builder()
                .allGradeDto(grades.stream()
                        .map(grade -> GetAllGradeDto.AllGradeDto.builder()
                                .courseName(grade.getCourseName())
                                .score(grade.getScore())
                                .semester(String.valueOf(grade.getSemester()))
                                .build())
                        .toList())
                .build();
    }

    public GetBeforeGradeDto getGrade(String userCode) {
        List<Grade> grades = gradeService.getGrade(userCode);
        Long semester = userService.findByUserCode(userCode).getSemester();

        return GetBeforeGradeDto.builder()
                .beforeGradeDtoList(grades.stream()
                        .filter(grade -> grade.getSemester().equals(semester - 1))
                        .map(grade -> GetBeforeGradeDto.BeforeGradeDto.builder()
                                .courseName(grade.getCourseName())
                                .score(grade.getScore())
                                .build())
                        .toList())
                .build();
    }
}
