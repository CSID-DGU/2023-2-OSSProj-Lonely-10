package ossproj.lonely.DGU.Portal.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ossproj.lonely.DGU.Portal.domain.Score;
import ossproj.lonely.DGU.Portal.repository.ScoreRepository;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ScoreService {
    private final ScoreRepository scoreRepository;

    @Transactional
    public void save(Score score) {
        scoreRepository.save(score);
    }

    @Transactional
    public List<Score> getScore(String userCode, String courseCode) {
        return scoreRepository.findScoreByUserCodeAndCourseCode(userCode, courseCode);
    }
}
