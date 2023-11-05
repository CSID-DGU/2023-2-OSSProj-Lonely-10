package ossproj.lonely.DGU.Portal.dto.main.sub;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class NoticeDto {
    private String title;
    private String url;
    private String administrator;
}
