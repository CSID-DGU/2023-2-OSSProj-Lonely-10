package ossproj.lonely.DGU.Portal.dto.main.sub;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class InfoDto {
    @JsonProperty("user_name")
    private String userName;

    @JsonProperty("user_code")
    private String userCode;
}
