package ossproj.lonely.DGU.Portal.dto.school.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import ossproj.lonely.DGU.Portal.dto.main.sub.CourseDto;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class GetSchoolResponseDto {
    @JsonProperty("user_course")
    List<UserCourseDto> userCourses;
    @JsonProperty("todo")
    List<TodoDto> todos;
    @JsonProperty("course_schedule")
    List<CourseDto> courseSchedules;

    @Getter @Builder
    @AllArgsConstructor
    public static class TodoDto {
        @JsonProperty("content")
        private String content;
        @JsonProperty("status")
        private String status;
        @JsonProperty("created_at")
        private String createdAt;
    }

    @Getter @Builder
    @AllArgsConstructor
    public static class UserCourseDto {
        @JsonProperty("course_name")
        private String courseName;
        @JsonProperty("course_code")
        private String courseCode;
        @JsonProperty("professor")
        private String professor;
        @JsonProperty("schedules")
        List<UserScheduleDto> schedules;
    }

    @Getter @Builder
    @AllArgsConstructor
    public static class UserScheduleDto {
        @JsonProperty("time")
        private String time;
        @JsonProperty("classroom")
        private String classroom;
        @JsonProperty("days")
        private String days;
    }
}
