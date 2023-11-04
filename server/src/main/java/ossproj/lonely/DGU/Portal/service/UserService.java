package ossproj.lonely.DGU.Portal.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ossproj.lonely.DGU.Portal.domain.User;
import ossproj.lonely.DGU.Portal.dto.user.UserSignUpDto;
import ossproj.lonely.DGU.Portal.exception.CustomException;
import ossproj.lonely.DGU.Portal.exception.ErrorCode;
import ossproj.lonely.DGU.Portal.repository.UserRepository;
import ossproj.lonely.DGU.Portal.utils.PrincipalDetails;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void save(User user) {
        userRepository.save(user);
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    public User findByUserCode(String userCode) {
        return userRepository.findByUserCode(userCode).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
    }

    @Transactional
    public void saveUser(UserSignUpDto userSignUpDto) {
        validateDuplicateUser(userSignUpDto.getUserCode());
        User user = User.builder()
                .userCode(userSignUpDto.getUserCode())
                .userName(userSignUpDto.getUserName())
                .userEmail(userSignUpDto.getUserEmail())
                .department(userSignUpDto.getDepartment())
                .semester(userSignUpDto.getSemester())
                .major(userSignUpDto.getMajor())
                .phoneNumber(userSignUpDto.getPhoneNumber())
                .hashPassword(getEncoderPassword(userSignUpDto))
                .build();
    userRepository.save(user);
    log.info("===== Save User Success =====");
    }

    @Transactional(readOnly = true)
    public void validateDuplicateUser(String userCode) {
        userRepository.findByUserCode(userCode)
                .ifPresent(user -> {
                    throw new CustomException(ErrorCode.DUPLICATE_USER);
                });
    }

    private String getEncoderPassword(UserSignUpDto userSignUpDto) {
        return passwordEncoder.encode(userSignUpDto.getPassword());
    }

    @Transactional
    public void login(UserSignUpDto userSignUpDto, HttpServletResponse response) {
        User user = userRepository.findByUserCode(userSignUpDto.getUserCode()).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        authenticateUser(user);
        if (!passwordEncoder.matches(userSignUpDto.getPassword(), user.getHashPassword())) {
            throw new CustomException(ErrorCode.WRONG_PASSWORD);
        }
        TokenPair tokenPair = generateTokens(user);
        saveRefreshToken(user, tokenPair.getRefreshToken());
        sendTokensToClient(response, tokenPair);
        log.info("===== Login Success =====");

    }

    @Transactional
    public void logout(String userCode) {
        User user = userRepository.findByUserCode(userCode).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        user.setRefreshToken(null);
        log.info("===== Logout Success =====");
    }

    @Transactional
    public void refreshLogin(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = jwtService.extractRefreshToken(request)
                .filter(jwtService::isTokenValid)
                .orElseThrow(() -> new CustomException(ErrorCode.INVALID_REQUEST));
        userRepository.findByRefreshToken(refreshToken)
                .ifPresent(user -> {
                    TokenPair tokenPair = generateTokens(user);
                    saveRefreshToken(user, tokenPair.getRefreshToken());
                    sendTokensToClient(response, tokenPair);
                    log.info("===== Refresh Login Success =====");
                });
    }


    private void saveRefreshToken(User user, String refreshToken) {
        jwtService.updateRefreshToken(user.getUserCode(), refreshToken);
    }

    private void sendTokensToClient(HttpServletResponse response, TokenPair tokens) {
        jwtService.sendAccessTokenAndRefreshToken(response, tokens.getAccessToken(), tokens.getRefreshToken());
    }

    private void authenticateUser(User user) {
        PrincipalDetails principalDetails = new PrincipalDetails(user);
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(principalDetails, null, null);
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }

    private TokenPair generateTokens(User user) {
        String accessToken = jwtService.createAccessToken(user.getUserCode());
        String refreshToken = jwtService.createRefreshToken();
        return new TokenPair(accessToken, refreshToken);
    }

    @Getter
    private static class TokenPair {
        private final String accessToken;
        private final String refreshToken;

        public TokenPair(String accessToken, String refreshToken) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        }

    }
}
