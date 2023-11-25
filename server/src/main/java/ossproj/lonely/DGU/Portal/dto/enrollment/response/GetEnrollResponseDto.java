package ossproj.lonely.DGU.Portal.dto.enrollment.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class GetEnrollResponseDto {
    private List<EnrollDto> enrollList;

    @Getter
    @Builder
    @AllArgsConstructor
    public static class EnrollDto {
        @JsonProperty("course_code")
        private String courseCode;

        @JsonProperty("course_name")
        private String courseName;

        @JsonProperty("professor")
        private String professor;
    }
}
