package ossproj.lonely.DGU.Portal.dto.record.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class GetUserInfoResponseDto {
    @JsonProperty("user_name")
    private String userName;
    @JsonProperty("user_code")
    private String userCode;
    @JsonProperty("email")
    private String email;
    @JsonProperty("department")
    private String department;
    @JsonProperty("major")
    private String major;
    @JsonProperty("semester")
    private String semester;
    @JsonProperty("phone_number")
    private String phoneNumber;
}
