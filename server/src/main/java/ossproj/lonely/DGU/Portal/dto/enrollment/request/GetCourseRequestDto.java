package ossproj.lonely.DGU.Portal.dto.enrollment.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class GetCourseRequestDto {
    @JsonProperty("search")
    private String search;
    @JsonProperty("type")
    private String type;
}
