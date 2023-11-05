package ossproj.lonely.DGU.Portal.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import ossproj.lonely.DGU.Portal.filter.CustomJsonUserCodePasswordAuthenticationFilter;
import ossproj.lonely.DGU.Portal.filter.JwtAuthenticationProcessingFilter;
import ossproj.lonely.DGU.Portal.handler.LoginFailedHandler;
import ossproj.lonely.DGU.Portal.handler.LoginSuccessHandler;
import ossproj.lonely.DGU.Portal.repository.UserRepository;
import ossproj.lonely.DGU.Portal.service.JwtService;
import ossproj.lonely.DGU.Portal.utils.PrincipalDetailsService;

@Configuration
@EnableScheduling
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final UserRepository userRepository;
    private final JwtService jwtService;

//    @Bean
//    public AntPathMatcher antPathMatcher() {
//        return new AntPathMatcher();
//    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(new PrincipalDetailsService(userRepository));
        return new ProviderManager(provider);
    }

    @Bean
    public CustomJsonUserCodePasswordAuthenticationFilter customJsonUserCodePasswordAuthenticationFilter() {
        AuthenticationManager authManager = authenticationManager();
        LoginSuccessHandler loginSuccessHandler = loginSuccessHandler();
        LoginFailedHandler loginFailedHandler = loginFailedHandler();
        CustomJsonUserCodePasswordAuthenticationFilter customJsonUserCodePasswordAuthenticationFilter
                = new CustomJsonUserCodePasswordAuthenticationFilter(objectMapper(), authManager, jwtService);
        customJsonUserCodePasswordAuthenticationFilter.setAuthenticationManager(authManager);
        customJsonUserCodePasswordAuthenticationFilter.setAuthenticationSuccessHandler(loginSuccessHandler);
        customJsonUserCodePasswordAuthenticationFilter.setAuthenticationFailureHandler(loginFailedHandler);
        return customJsonUserCodePasswordAuthenticationFilter;
    }



    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        return objectMapper;
    }

    @Bean
    public JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter() {
        return new JwtAuthenticationProcessingFilter(jwtService, userRepository);
    }


    @Bean
    public LoginSuccessHandler loginSuccessHandler() {
        return new LoginSuccessHandler(jwtService);
    }

    @Bean
    public LoginFailedHandler loginFailedHandler() {
        return new LoginFailedHandler();
    }
}
