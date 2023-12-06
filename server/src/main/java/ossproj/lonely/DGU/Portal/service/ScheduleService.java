package ossproj.lonely.DGU.Portal.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ossproj.lonely.DGU.Portal.domain.Schedule;
import ossproj.lonely.DGU.Portal.dto.main.sub.ScheduleDto;
import ossproj.lonely.DGU.Portal.repository.ScheduleRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;

    @Transactional
    public void save(Schedule schedule) {
        scheduleRepository.save(schedule);
    }

    @Transactional
    public List<ScheduleDto> getSchedule() {
        LocalDate now = LocalDate.now();
        int currentMonth = now.getMonthValue();

        List<Schedule> schedules = scheduleRepository.findAll();
        return schedules.stream()
                .filter(schedule -> schedule.getDate().getMonthValue() == currentMonth)
                .map(schedule -> new ScheduleDto(schedule.getTitle(), schedule.getDescription(), schedule.getDate()))
                .collect(Collectors.toList());
    }
}
