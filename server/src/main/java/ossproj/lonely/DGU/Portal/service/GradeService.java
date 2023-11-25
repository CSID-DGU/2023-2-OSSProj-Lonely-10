package ossproj.lonely.DGU.Portal.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ossproj.lonely.DGU.Portal.domain.Grade;
import ossproj.lonely.DGU.Portal.repository.GradeRepository;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class GradeService {
    private final GradeRepository gradeRepository;

    @Transactional
    public void save(Grade grade) {
        gradeRepository.save(grade);
    }

    @Transactional
    public List<Grade> getGrade(String userCode) {
        return gradeRepository.findByUserCode(userCode);
    }

}
