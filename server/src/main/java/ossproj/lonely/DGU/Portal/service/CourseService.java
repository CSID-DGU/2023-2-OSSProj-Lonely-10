package ossproj.lonely.DGU.Portal.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ossproj.lonely.DGU.Portal.domain.Course;
import ossproj.lonely.DGU.Portal.domain.CourseInfo;
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
    private final CourseInfoService courseInfoService;

    @Transactional
    public void save(Course course) {
        courseRepository.save(course);
    }

    @Transactional
    public List<Course> findAllCourse() {
        return courseRepository.findAll();
    }

    @Transactional
    public Course findByCourseCode(String courseCode) {
        return courseRepository.findByCourseCode(courseCode);
    }

    @Transactional
    public List<CourseDto> getCourse(List<Course> courses) {
        List<String> courseCodes = courses.stream()
                .map(Course::getCourseCode)
                .toList();
        List<CourseInfo> courseInfos = new ArrayList<>();

        for (String courseCode : courseCodes) {
            List<CourseInfo> tmp = courseInfoService.findByCourseCode(courseCode);
            courseInfos.addAll(tmp);
        }

        return courseInfos.stream()
                .map(courseInfo -> new CourseDto(courseInfo.getCourseCode(), courseInfo.getClassroom(), courseInfo.getStartTime() + "~" + courseInfo.getEndTime()))
                .collect(Collectors.toList());
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
