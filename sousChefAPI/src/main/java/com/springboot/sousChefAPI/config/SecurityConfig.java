package com.springboot.sousChefAPI.config;

import com.springboot.sousChefAPI.service.AccountService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final AccountService accountService;

    @Autowired
    private JwtFilter jwtFilter;

    public SecurityConfig(AccountService accountService) {
        this.accountService = accountService;
    }

    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(accountService);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer.configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues()))
                .authorizeHttpRequests(request -> request.requestMatchers(HttpMethod.POST, "api/account/create").permitAll()
                        .requestMatchers(HttpMethod.POST, "api/account/login").permitAll()
                        .anyRequest().authenticated()).csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy((SessionCreationPolicy.STATELESS))).addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class).build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
