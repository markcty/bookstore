package com.bookstore.backend.security;

import java.util.Arrays;

import javax.servlet.http.HttpServletResponse;

import com.bookstore.backend.security.auth.AuthUserDetail;
import com.bookstore.backend.security.auth.AuthUserDetailsService;
import com.bookstore.backend.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@SuppressWarnings("deprecation")
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  private AuthUserDetailsService userDetailsService;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private UserService userService;

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService);
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {

    // Basic Auth
    http.cors().and().csrf().disable().httpBasic();

    // access control
    http.authorizeRequests()
        // public request
        .antMatchers("/api/books", "/api/book", "/api/register").permitAll()
        // admin request
        .antMatchers("/api/admin/**").hasRole("ADMIN")
        // user request
        .anyRequest().authenticated();

    // auth
    http.formLogin()
        // login
        .loginPage("/api/login").permitAll()
        // success
        .successHandler((req, res, auth) -> {
          res.setStatus(HttpServletResponse.SC_OK);
          AuthUserDetail user = (AuthUserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
          res.setContentType("application/json;charset=utf-8");
          var writer = res.getWriter();
          writer.println(objectMapper.writeValueAsString(userService.getUser(user.getUsername())));
        })
        // fail
        .failureHandler((req, res, e) -> {
          var writer = res.getWriter();
          res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
          if (e instanceof UsernameNotFoundException || e instanceof BadCredentialsException)
            writer.println("Wrong username or password!");
          else if (e instanceof DisabledException)
            writer.println("Your account is disabled. Please contact Admin.");
        })
        // logout
        .and().logout().logoutUrl("/api/logout").logoutSuccessHandler((req, res, auth) -> {
          var writer = res.getWriter();
          res.setStatus(HttpServletResponse.SC_OK);
          res.setContentType("text/html; charset=UTF-8");
          writer.println("logout succeed!");
        }).permitAll();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return NoOpPasswordEncoder.getInstance();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowCredentials(true);
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowedMethods(Arrays.asList("*"));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration(("/**"), configuration);
    return source;
  }
}
