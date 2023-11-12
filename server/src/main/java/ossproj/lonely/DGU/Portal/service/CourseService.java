package ossproj.lonely.DGU.Portal.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ossproj.lonely.DGU.Portal.domain.Course;
import ossproj.lonely.DGU.Portal.dto.enrollment.response.GetCourseResponseDto.SubCourseDto;
import ossproj.lonely.DGU.Portal.dto.main.sub.CourseDto;
import ossproj.lonely.DGU.Portal.repository.CourseRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;

    @Transactional
    public void save(Course course) {
        courseRepository.save(course);
    }

    @Transactional
    public Course findByCourseCode(String courseCode) {
        return courseRepository.findByCourseCode(courseCode);
    }

    @Transactional
    public List<CourseDto> getCourse() {
        List<CourseDto> courseDtos = new ArrayList<>();

        CourseDto course1 = new CourseDto("오픈소스소프트웨어프로젝트", "정보문화관P P404 강의실", "월 13:00~15:00");
        CourseDto course2 = new CourseDto("오픈소스소프트웨어프로젝트", "정보문화관P P403 컴퓨터실습실2", "수 13:00~15:00");
        CourseDto course3 = new CourseDto("골프", "혜화관 B104 운동기능학습장3", "화 10:00~12:00");
        CourseDto course4 = new CourseDto("태권도", "체육관 B103 운동기능학습장2", "화 12:00~14:00");
        CourseDto course5 = new CourseDto("농구", "체육관 113 경기장", "목 12:00~14:00");

        courseDtos.add(course1);
        courseDtos.add(course2);
        courseDtos.add(course3);
        courseDtos.add(course4);
        courseDtos.add(course5);

        return courseDtos;
    }

    @Transactional
    public List<SubCourseDto> getCourseByCourseName(String courseName) {
        List<Course> courses = courseRepository.findByCourseName(courseName);
        return courses.stream()
                .map(course -> new SubCourseDto(course.getCourseName(), course.getCourseCode(), course.getProfessor(), course.isOnline()))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<SubCourseDto> getCourseByCourseCode(String courseCode) {
        Course course = courseRepository.findByCourseCode(courseCode);
        return List.of(new SubCourseDto(course.getCourseName(), course.getCourseCode(), course.getProfessor(), course.isOnline()));
    }

    @Transactional
    public List<SubCourseDto> getCourseByProfessor(String professor) {
        List<Course> courses = courseRepository.findByProfessor(professor);
        return courses.stream()
                .map(course -> new SubCourseDto(course.getCourseName(), course.getCourseCode(), course.getProfessor(), course.isOnline()))
                .collect(Collectors.toList());
    }
}
