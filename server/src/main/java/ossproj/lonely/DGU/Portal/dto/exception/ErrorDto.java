package ossproj.lonely.DGU.Portal.dto.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@AllArgsConstructor
public class ErrorDto {
    private String code;

    public ErrorDto() {}
}
