package ossproj.lonely.DGU.Portal.dto.school.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class GetCourseDetailResponseDto {
    @JsonProperty("course_id")
    private String courseId;
    @JsonProperty("course_code")
    private String courseCode;
    @JsonProperty("course_name")
    private String courseName;
    @JsonProperty("professor")
    private String professor;
    @JsonProperty("attendance")
    private List<AttendanceDto> attendance;
    @JsonProperty("score")
    private List<scoreDto> score;
    @JsonProperty("announcement")
    private List<AnnouncementDto> announcement;
    @JsonProperty("assignment")
    private List<AssignmentDto> assignment;

    @Getter
    @Builder
    @AllArgsConstructor
    public static class AttendanceDto {
        @JsonProperty("date")
        private String date;
        @JsonProperty("status")
        private String status;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class scoreDto {
        @JsonProperty("type")
        private String type;
        @JsonProperty("score")
        private String score;
        @JsonProperty("date")
        private String date;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class AnnouncementDto {
        @JsonProperty("title")
        private String title;
        @JsonProperty("content")
        private String content;
        @JsonProperty("writer")
        private String writer;
        @JsonProperty("created_at")
        private String createdAt;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class AssignmentDto {
        @JsonProperty("title")
        private String title;
        @JsonProperty("content")
        private String content;
        @JsonProperty("duration")
        private String duration;
        @JsonProperty("created_at")
        private String createdAt;
    }
}
