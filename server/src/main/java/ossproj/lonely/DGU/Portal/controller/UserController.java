package ossproj.lonely.DGU.Portal.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ossproj.lonely.DGU.Portal.dto.user.UserSignUpDto;
import ossproj.lonely.DGU.Portal.service.UserService;

@Slf4j
@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @PostMapping("/signup")
    public void saveUser(@RequestBody UserSignUpDto userSignUpDto) {
        userService.saveUser(userSignUpDto);
    }

    @PostMapping("/logout/{userCode}")
    public void logoutUser(@PathVariable String userCode) {
        userService.logout(userCode);
    }

    @PostMapping("/refresh")
    public ResponseEntity<Void> refreshLogin(HttpServletRequest request,
                                             HttpServletResponse response) {
        userService.refreshLogin(request, response);
        return ResponseEntity.ok().build();
    }
}
