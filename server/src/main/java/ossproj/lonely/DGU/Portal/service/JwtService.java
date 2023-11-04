package ossproj.lonely.DGU.Portal.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ossproj.lonely.DGU.Portal.domain.User;
import ossproj.lonely.DGU.Portal.exception.CustomException;
import ossproj.lonely.DGU.Portal.exception.ErrorCode;
import ossproj.lonely.DGU.Portal.repository.UserRepository;

import java.util.Date;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Getter
public class JwtService {
    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.access.exp}")
    private Long accessExp;

    @Value("${jwt.refresh.exp}")
    private Long refreshExp;

    @Value("${jwt.access.header}")
    private String accessHeader;

    @Value("${jwt.refresh.header}")
    private String refreshHeader;

    private final UserRepository userRepository;

    private static final String ACCESS_TOKEN_SUBJECT = "AccessToken";
    private static final String REFRESH_TOKEN_SUBJECT = "RefreshToken";
    private static final String EMAIL_CLAIM = "email";
    private static final String BEARER = "Bearer ";
    private static final String USER_CODE_CLAIM = "userCode";

    public String createAccessToken(String userCode) {
        Date newDate = new Date();
        return JWT.create()
                .withSubject(ACCESS_TOKEN_SUBJECT)
                .withExpiresAt(new Date(newDate.getTime() + accessExp))
                .withClaim(USER_CODE_CLAIM, userCode)
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

    public String createRefreshToken() {
        Date newDate = new Date();
        return JWT.create()
                .withSubject(REFRESH_TOKEN_SUBJECT)
                .withExpiresAt(new Date(newDate.getTime() + refreshExp))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

    public void sendAccessTokenAndRefreshToken(HttpServletResponse response, String accessToken, String refreshToken) {
        response.setStatus(HttpServletResponse.SC_OK);
        response.setHeader(accessHeader, BEARER + accessToken);
        response.setHeader(refreshHeader, BEARER + refreshToken);
    }

    public Optional<String> extractAccessToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(accessHeader))
                .filter(accessToken -> accessToken.startsWith(BEARER))
                .map(accessToken -> accessToken.replace(BEARER, ""));
    }

    public Optional<String> extractRefreshToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(refreshHeader))
                .filter(refreshToken -> refreshToken.startsWith(BEARER))
                .map(refreshToken -> refreshToken.replace(BEARER, ""));
    }

    public Optional<String> extractUserCode(String accessToken) {
        try {
            return Optional.ofNullable(JWT.require(Algorithm.HMAC512(secretKey.getBytes()))
                    .build()
                    .verify(accessToken)
                    .getClaim(USER_CODE_CLAIM)
                    .asString());
        } catch (Exception e) {
            log.error("유효하지 않은 엑세스 토큰입니다.");
            return Optional.empty();
        }
    }

    @Transactional
    public void updateRefreshToken(String userCode, String refreshToken) {
        User user = userRepository.findByUserCode(userCode)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        user.setRefreshToken(refreshToken);
    }

    public boolean isTokenValid(String token) {
        try {
            JWT.require(Algorithm.HMAC512(secretKey.getBytes()))
                    .build()
                    .verify(token);
            return true;
        } catch (Exception e) {
            log.error("유효하지 않은 토큰입니다.");
            return false;
        }
    }

}
