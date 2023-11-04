package ossproj.lonely.DGU.Portal.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import ossproj.lonely.DGU.Portal.domain.User;
import ossproj.lonely.DGU.Portal.exception.CustomException;
import ossproj.lonely.DGU.Portal.exception.ErrorCode;
import ossproj.lonely.DGU.Portal.repository.UserRepository;
import ossproj.lonely.DGU.Portal.service.JwtService;
import ossproj.lonely.DGU.Portal.utils.PrincipalDetails;

import java.io.IOException;

@Slf4j
public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {
    private static final String NO_CHECK_URL_LOGIN = "/api/v1/user/login";
    private static final String NO_CHECK_URL_SIGNUP = "/api/v1/user/signup";

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JwtAuthenticationProcessingFilter(JwtService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getRequestURI().contains(NO_CHECK_URL_LOGIN) || request.getRequestURI().contains(NO_CHECK_URL_SIGNUP)) {
            filterChain.doFilter(request, response);
            return;
        }

        String refreshToken = jwtService.extractRefreshToken(request)
                .filter(jwtService::isTokenValid)
                .orElse(null);

        if (refreshToken != null) {
            reIssueAccessTokenAndRefreshToken(refreshToken, response);
            filterChain.doFilter(request, response);
            return;
        }

        checkAccessTokenAndAuthentication(request);
        filterChain.doFilter(request, response);
    }

    public void reIssueAccessTokenAndRefreshToken(String refreshToken, HttpServletResponse response) {
        userRepository.findByRefreshToken(refreshToken)
                .ifPresent(
                        user -> {
                            String reIssueAccessToken = jwtService.createAccessToken(user.getUserCode());
                            String reIssueRefreshToken = jwtService.createRefreshToken();
                            jwtService.updateRefreshToken(user.getUserCode(), reIssueRefreshToken);
                            jwtService.sendAccessTokenAndRefreshToken(response, reIssueAccessToken, reIssueRefreshToken);
                            saveAuthentication(user);
                        }
                );
    }

    private void checkAccessTokenAndAuthentication(HttpServletRequest request) {
        jwtService.extractAccessToken(request)
                .ifPresent(accessToken -> {
                            String userCode = jwtService.extractUserCode(accessToken).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
                            userRepository.findByUserCode(userCode)
                                    .ifPresent(
                                            this::saveAuthentication
                                    );
                        }
                );
    }

    private void saveAuthentication(User user) {
        PrincipalDetails principalDetails = new PrincipalDetails(user);
        Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, null);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
