package ossproj.lonely.DGU.Portal.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ossproj.lonely.DGU.Portal.dto.school.request.GetSchoolRequestDto;
import ossproj.lonely.DGU.Portal.dto.school.request.MakeTodoRequestDto;
import ossproj.lonely.DGU.Portal.dto.school.request.UpdateTodoRequestDto;
import ossproj.lonely.DGU.Portal.dto.school.response.GetCourseDetailResponseDto;
import ossproj.lonely.DGU.Portal.dto.school.response.GetSchoolResponseDto;
import ossproj.lonely.DGU.Portal.facade.AggregationFacade;

@Slf4j
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class SchoolController {
    private final AggregationFacade aggregationFacade;

    @PostMapping("/todos")
    public ResponseEntity<String> makeTodos(@RequestBody MakeTodoRequestDto makeTodoRequestDto) {

        aggregationFacade.makeTodos(makeTodoRequestDto.getUserCode(), makeTodoRequestDto.getContent());
        return ResponseEntity.ok("success");
    }

    @DeleteMapping("/todos/{todoId}")
    public ResponseEntity<String> deleteTodo(@PathVariable Long todoId) {
        aggregationFacade.deleteTodo(todoId);
        return ResponseEntity.ok("success");
    }

    @PatchMapping("/todos/{todoId}")
    public ResponseEntity<String> updateTodo(@PathVariable Long todoId,
                                             @RequestBody UpdateTodoRequestDto updateTodoRequestDto) {
        aggregationFacade.updateTodoContent(todoId, updateTodoRequestDto.getContent());
        return ResponseEntity.ok("success");
    }

    @PostMapping("/todos/{todoId}")
    public ResponseEntity<String> updateTodoStatus(@PathVariable Long todoId) {
        aggregationFacade.updateTodoStatus(todoId);
        return ResponseEntity.ok("success");
    }

    @GetMapping("/lms")
    public ResponseEntity<GetSchoolResponseDto> getSchoolComponent(@RequestBody GetSchoolRequestDto getSchoolRequestDto) {
        return ResponseEntity.ok(aggregationFacade.getSchoolComponent(getSchoolRequestDto.getUserCode()));
    }

    @GetMapping("/lms/{courseCode}")
    public ResponseEntity<GetCourseDetailResponseDto> getCourseDetails(@RequestBody GetSchoolRequestDto getSchoolRequestDto,
                                                                       @PathVariable String courseCode) {
        return ResponseEntity.ok(aggregationFacade.getCourseDetails(getSchoolRequestDto.getUserCode(), courseCode));
    }
}
