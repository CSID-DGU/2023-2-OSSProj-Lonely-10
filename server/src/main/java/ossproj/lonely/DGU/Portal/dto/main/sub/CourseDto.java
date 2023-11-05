package ossproj.lonely.DGU.Portal.dto.main.sub;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CourseDto {
    @JsonProperty("course_name")
    private String courseName;

    @JsonProperty("classroom")
    private String classroom;

    @JsonProperty("time")
    private String time;
}
