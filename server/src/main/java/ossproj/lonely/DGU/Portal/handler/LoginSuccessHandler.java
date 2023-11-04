package ossproj.lonely.DGU.Portal.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import ossproj.lonely.DGU.Portal.domain.User;
import ossproj.lonely.DGU.Portal.service.JwtService;
import ossproj.lonely.DGU.Portal.utils.PrincipalDetails;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtService jwtService;

    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        User user = principalDetails.getUser();
        String userCode = user.getUserCode();

        String accessToken = jwtService.createAccessToken(userCode);
        String refreshToken = jwtService.createRefreshToken();
        jwtService.updateRefreshToken(userCode, refreshToken);
        log.info("===== Login Success =====");
        jwtService.sendAccessTokenAndRefreshToken(response, accessToken, refreshToken);
    }
}
