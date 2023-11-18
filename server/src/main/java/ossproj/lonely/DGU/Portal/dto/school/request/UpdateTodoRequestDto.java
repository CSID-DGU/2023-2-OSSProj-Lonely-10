package ossproj.lonely.DGU.Portal.dto.school.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter @Builder
@AllArgsConstructor
public class UpdateTodoRequestDto {
    @JsonProperty("content")
    private String content;
}
