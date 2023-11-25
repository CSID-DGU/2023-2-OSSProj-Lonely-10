package ossproj.lonely.DGU.Portal.dto.record.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class GetAllGradeDto {
    @JsonProperty("grade")
    private List<AllGradeDto> allGradeDto;

    @Getter
    @Builder
    @AllArgsConstructor
    public static class AllGradeDto {
        @JsonProperty("course_name")
        private String courseName;
        @JsonProperty("score")
        private String score;
        @JsonProperty("semester")
        private String semester;
    }
}
