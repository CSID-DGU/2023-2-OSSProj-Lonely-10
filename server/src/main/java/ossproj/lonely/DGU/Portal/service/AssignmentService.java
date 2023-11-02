package ossproj.lonely.DGU.Portal.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ossproj.lonely.DGU.Portal.domain.Assignment;
import ossproj.lonely.DGU.Portal.repository.AssignmentRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;

    @Transactional
    public void save(Assignment assignment) {
        assignmentRepository.save(assignment);
    }
}
