package ossproj.lonely.DGU.Portal.dto.enrollment.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class GetEnrollRequestDto {
    @JsonProperty("user_code")
    private String userCode;
}
