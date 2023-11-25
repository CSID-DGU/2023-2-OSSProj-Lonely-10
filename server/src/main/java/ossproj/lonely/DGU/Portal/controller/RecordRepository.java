package ossproj.lonely.DGU.Portal.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ossproj.lonely.DGU.Portal.dto.record.request.GetUserInfoRequestDto;
import ossproj.lonely.DGU.Portal.dto.record.response.GetAllGradeDto;
import ossproj.lonely.DGU.Portal.dto.record.response.GetBeforeGradeDto;
import ossproj.lonely.DGU.Portal.dto.record.response.GetUserInfoResponseDto;
import ossproj.lonely.DGU.Portal.facade.AggregationFacade;

@Slf4j
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class RecordRepository {
    private final AggregationFacade aggregationFacade;

    @GetMapping("/info")
    public ResponseEntity<GetUserInfoResponseDto> getUserInfo(@RequestBody GetUserInfoRequestDto getUserInfoRequestDto) {
        return ResponseEntity.ok(aggregationFacade.getUserInfo(getUserInfoRequestDto.getUserCode()));
    }

    @GetMapping("/grade/{userCode}")
    public ResponseEntity<GetAllGradeDto> getAllGrade(@PathVariable String userCode) {
        return ResponseEntity.ok(aggregationFacade.getAllGrade(userCode));
    }

    @GetMapping("/before/{userCode}")
    public ResponseEntity<GetBeforeGradeDto> getGrade(@PathVariable String userCode) {
        return ResponseEntity.ok(aggregationFacade.getGrade(userCode));
    }
}
