package com.bookstore.backend.security;

import com.bookstore.backend.security.auth.AuthUserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  private AuthUserDetailsService jwtUserDetailsService;

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(jwtUserDetailsService);
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf().disable()
        // allow preflight
        .authorizeRequests().antMatchers(HttpMethod.OPTIONS).permitAll().and()
        // public request
        .authorizeRequests().antMatchers("/api/books", "/api/book", "/api/register").permitAll().and()
        // admin request
        .authorizeRequests().antMatchers("/api/admin/book").hasRole("ADMIN").and()
        // user request
        .authorizeRequests().anyRequest().authenticated().and()
        // basic auth
        .httpBasic();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return NoOpPasswordEncoder.getInstance();
  }
}
