package ossproj.lonely.DGU.Portal.dto.record.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class GetUserInfoRequestDto {
    @JsonProperty("user_code")
    private String userCode;
}
