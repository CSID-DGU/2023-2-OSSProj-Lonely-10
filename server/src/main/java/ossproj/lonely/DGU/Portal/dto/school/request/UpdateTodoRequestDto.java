package ossproj.lonely.DGU.Portal.dto.school.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UpdateTodoRequestDto {
    @JsonProperty("content")
    private String content;
}
