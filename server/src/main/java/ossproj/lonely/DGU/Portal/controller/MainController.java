package ossproj.lonely.DGU.Portal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ossproj.lonely.DGU.Portal.dto.main.MainComponentDto;
import ossproj.lonely.DGU.Portal.facade.AggregationFacade;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class MainController {
    private final AggregationFacade aggregationFacade;

    @GetMapping("/main/{userCode}")
    public ResponseEntity<MainComponentDto> getComponent(@PathVariable String userCode) {
        MainComponentDto mainComponentDto = aggregationFacade.getMainComponent(userCode);
        return ResponseEntity.ok(mainComponentDto);
    }
}
