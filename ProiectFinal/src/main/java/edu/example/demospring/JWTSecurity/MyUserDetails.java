package edu.example.demospring.JWTSecurity;

import edu.example.demospring.model.UserDTO;
import edu.example.demospring.persitence.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
public class MyUserDetails  implements UserDetails {


    public long id;
    private String email;
    private String username;
    private String password;


    public MyUserDetails(User user){
        id=user.getId();
        email=user.getEmail();
        username=user.getUsername();
        password=user.getPassword();

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority>authorities=new HashSet<>();
        return authorities;
    }
    public long getId(){
        return id;
    }
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
