package ossproj.lonely.DGU.Portal.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ossproj.lonely.DGU.Portal.domain.Enrollment;
import ossproj.lonely.DGU.Portal.repository.EnrollmentRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;

    @Transactional
    public void save(Enrollment enrollment) {
        enrollmentRepository.save(enrollment);
    }
}
