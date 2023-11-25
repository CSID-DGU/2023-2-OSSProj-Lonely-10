package ossproj.lonely.DGU.Portal.dto.enrollment.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class PostEnrollRequestDto {
    @JsonProperty("user_code")
    private String userCode;

    @JsonProperty("course_code")
    private String courseCode;
}
