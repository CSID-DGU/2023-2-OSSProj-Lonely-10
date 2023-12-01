package ossproj.lonely.DGU.Portal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ossproj.lonely.DGU.Portal.dto.enrollment.request.PostEnrollRequestDto;
import ossproj.lonely.DGU.Portal.dto.enrollment.response.GetCourseResponseDto;
import ossproj.lonely.DGU.Portal.dto.enrollment.request.GetCourseRequestDto;
import ossproj.lonely.DGU.Portal.dto.enrollment.response.GetEnrollResponseDto;
import ossproj.lonely.DGU.Portal.facade.AggregationFacade;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class EnrollmentController {
    private final AggregationFacade aggregationFacade;

    @PostMapping("/course")
    public GetCourseResponseDto getCourse(@RequestBody GetCourseRequestDto getCourseRequestDto) {
        String search = getCourseRequestDto.getSearch();
        String type = getCourseRequestDto.getType();
        return switch (type) {
            case "course_code" -> aggregationFacade.getCourseByCourseCode(search);
            case "professor" -> aggregationFacade.getCourseByProfessor(search);
            case "course_name" -> aggregationFacade.getCourseByCourseName(search);
            default -> null;
        };
    }

    @PostMapping("/enroll")
    public ResponseEntity<String> postEnroll(@RequestBody PostEnrollRequestDto postEnrollRequestDto) {
        aggregationFacade.postEnroll(postEnrollRequestDto.getUserCode(), postEnrollRequestDto.getCourseCode());
        return ResponseEntity.ok("success");
    }

    @DeleteMapping("/enroll")
    public ResponseEntity<String> deleteEnroll(@RequestBody PostEnrollRequestDto postEnrollRequestDto) {
        aggregationFacade.deleteEnroll(postEnrollRequestDto.getUserCode(), postEnrollRequestDto.getCourseCode());
        return ResponseEntity.ok("success");
    }

    @GetMapping("/enroll/{userCode}")
    public ResponseEntity<GetEnrollResponseDto> getEnroll(@PathVariable String userCode) {
        return ResponseEntity.ok(aggregationFacade.getEnroll(userCode));
    }
}
