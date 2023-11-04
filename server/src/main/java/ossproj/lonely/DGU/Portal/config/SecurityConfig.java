package ossproj.lonely.DGU.Portal.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import ossproj.lonely.DGU.Portal.filter.CustomJsonUserCodePasswordAuthenticationFilter;
import ossproj.lonely.DGU.Portal.filter.JwtAuthenticationProcessingFilter;
import ossproj.lonely.DGU.Portal.utils.CustomAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final CorsConfig corsConfig;
    private final JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CustomJsonUserCodePasswordAuthenticationFilter customJsonUserCodePasswordAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .sessionManagement((sessionManagement) ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(config -> config
                        .requestMatchers("/api/v1/user/login").permitAll()
                        .requestMatchers("/api/v1/user/signup").permitAll()
                        .requestMatchers("/v3/api-docs/**").permitAll()
                        .requestMatchers("/swagger-ui/**").permitAll()
                        .requestMatchers("/api/v1/health").permitAll()
                        .anyRequest().authenticated());
        http
                .addFilterAfter(customJsonUserCodePasswordAuthenticationFilter, LogoutFilter.class);
        http
                .addFilterBefore(jwtAuthenticationProcessingFilter, CustomJsonUserCodePasswordAuthenticationFilter.class);
        http
                .exceptionHandling(config -> config.authenticationEntryPoint(customAuthenticationEntryPoint));
        http
                .addFilter(corsConfig.corsFilter());

        return http.build();
    }
}
