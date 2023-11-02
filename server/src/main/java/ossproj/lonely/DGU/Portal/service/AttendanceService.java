package ossproj.lonely.DGU.Portal.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ossproj.lonely.DGU.Portal.domain.Attendance;
import ossproj.lonely.DGU.Portal.repository.AttendanceRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;

    @Transactional
    public void save(Attendance attendance) {
        attendanceRepository.save(attendance);
    }
}
