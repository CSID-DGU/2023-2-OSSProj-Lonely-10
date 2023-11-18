package ossproj.lonely.DGU.Portal.dto.record.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class GetBeforeGradeDto {
    @JsonProperty("grade")
    private List<BeforeGradeDto> beforeGradeDtoList;

    @Getter
    @Builder
    @AllArgsConstructor
    public static class BeforeGradeDto {
        @JsonProperty("course_name")
        private String courseName;
        @JsonProperty("score")
        private String score;
    }
}
