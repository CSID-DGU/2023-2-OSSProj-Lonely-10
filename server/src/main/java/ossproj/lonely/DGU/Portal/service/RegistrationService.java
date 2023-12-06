package ossproj.lonely.DGU.Portal.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ossproj.lonely.DGU.Portal.domain.Course;
import ossproj.lonely.DGU.Portal.domain.Registration;
import ossproj.lonely.DGU.Portal.repository.RegistrationRepository;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class RegistrationService {
    private final RegistrationRepository registrationRepository;

    public void save(Registration registration) {
        registrationRepository.save(registration);
    }

    public void delete(Registration registration) {
        registrationRepository.delete(registration);
    }

    public Registration getRegistrationByUserCodeAndCourseCode(String userCode, String courseCode) {
        return registrationRepository.findByUserCodeAndCourseCode(userCode, courseCode);
    }

    public List<Course> getCourseByUserCode(String userCode) {
        return registrationRepository.findCoursesByUserCode(userCode);
    }
}
