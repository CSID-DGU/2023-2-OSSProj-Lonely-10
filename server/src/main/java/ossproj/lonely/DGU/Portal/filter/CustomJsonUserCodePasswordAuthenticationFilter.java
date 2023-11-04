package ossproj.lonely.DGU.Portal.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import ossproj.lonely.DGU.Portal.dto.user.UserLoginDto;
import ossproj.lonely.DGU.Portal.exception.ErrorCode;
import ossproj.lonely.DGU.Portal.service.JwtService;

import java.io.IOException;

@Slf4j
public class CustomJsonUserCodePasswordAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
    private static final String DEFAULT_LOGIN_PATH = "/api/v1/user/login";
    private static final String CONTENT_TYPE = "application/json";
    private final AuthenticationManager authenticationManager;
    private final ObjectMapper objectMapper;
    private final JwtService jwtService;

    public CustomJsonUserCodePasswordAuthenticationFilter(ObjectMapper objectMapper, AuthenticationManager authenticationManager, JwtService jwtService) {
        super(DEFAULT_LOGIN_PATH);
        this.objectMapper = objectMapper;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        if (request.getContentType() == null || !request.getContentType().equals(CONTENT_TYPE)) {
            throw new AuthenticationException(ErrorCode.INVALID_REQUEST.getCode()){};
        }

        try {
            log.info("======= login attempt =======");
            UserLoginDto userLoginDto = objectMapper.readValue(request.getInputStream(), UserLoginDto.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userLoginDto.getUserCode(), userLoginDto.getPassword()));
        } catch (IOException e) {
            log.error("======= login failed =======");
            throw new AuthenticationException(ErrorCode.LOGIN_FAILED.getCode()){};
        }
    }
}
