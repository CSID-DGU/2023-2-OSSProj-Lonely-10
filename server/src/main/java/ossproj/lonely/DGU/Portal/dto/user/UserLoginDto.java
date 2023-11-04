package ossproj.lonely.DGU.Portal.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UserLoginDto {
    @JsonProperty("user_code")
    private String userCode;

    @JsonProperty("password")
    private String password;

    public UserLoginDto() {}
}
