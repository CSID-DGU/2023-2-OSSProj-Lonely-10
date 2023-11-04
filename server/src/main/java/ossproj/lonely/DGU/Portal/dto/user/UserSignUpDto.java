package ossproj.lonely.DGU.Portal.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter @Setter
@RequiredArgsConstructor
public class UserSignUpDto {
    @JsonProperty("user_code")
    private String userCode;

    @JsonProperty("password")
    private String password;

    @JsonProperty("user_name")
    private String userName;

    @JsonProperty("user_email")
    private String userEmail;

    @JsonProperty("department")
    private String department;

    @JsonProperty("semester")
    private Integer semester;

    @JsonProperty("major")
    private String major;

    @JsonProperty("phone_number")
    private String phoneNumber;
}
