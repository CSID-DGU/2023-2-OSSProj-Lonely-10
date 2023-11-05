package ossproj.lonely.DGU.Portal.dto.main;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import ossproj.lonely.DGU.Portal.dto.main.sub.CourseDto;
import ossproj.lonely.DGU.Portal.dto.main.sub.InfoDto;
import ossproj.lonely.DGU.Portal.dto.main.sub.NoticeDto;
import ossproj.lonely.DGU.Portal.dto.main.sub.ScheduleDto;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class MainComponentDto {
    private List<NoticeDto> GeneralNotice;
    private List<NoticeDto> ScholarshipNotice;
    private List<NoticeDto> HaksaNotice;
    private List<CourseDto> Course;
    private List<ScheduleDto> Schedule;
    private InfoDto Info;
}
