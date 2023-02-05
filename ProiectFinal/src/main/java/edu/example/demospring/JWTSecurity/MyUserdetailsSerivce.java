package edu.example.demospring.JWTSecurity;

import edu.example.demospring.model.UserDTO;
import edu.example.demospring.persitence.User;
import edu.example.demospring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;

@Service
public class MyUserdetailsSerivce implements UserDetailsService{


    @Autowired


    UserRepository repository;
    @Override
    //preia username ul trimis si il cauta in baza de date
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=repository.findByUsername(username);
        if(user==null)
            throw new UsernameNotFoundException("user not found");
        var userDetails=new MyUserDetails(user);
            return userDetails;
    }
}
