package edu.example.demospring.service;

import edu.example.demospring.JWTSecurity.JwtTokenUtil;
import edu.example.demospring.JWTSecurity.MyUserDetails;
import edu.example.demospring.dao.UserServiceDAO;
import edu.example.demospring.model.LoginDTO;
import edu.example.demospring.model.ProductDTO;
import edu.example.demospring.model.UserDTO;
import edu.example.demospring.persitence.User;
import edu.example.demospring.repository.ProductRepository;
import edu.example.demospring.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class UserServiceController {
    PasswordEncoder passwordEncoder;

    private static Map<Long, UserDTO> userDTOMap=new HashMap<>();
    final UserRepository userRepository;
    final UserServiceDAO userServiceDAO;
    JwtTokenUtil token;
    private final ProductRepository productRepository;

    public UserServiceController(UserRepository userRepository, UserServiceDAO userServiceDAO,
                                 ProductRepository productRepository) {
        this.userRepository = userRepository;
        this.userServiceDAO = userServiceDAO;
        this.productRepository = productRepository;
    }

    @RequestMapping(value = "/users")
    public ResponseEntity getUsers()
    {
        return new ResponseEntity<>(userRepository.findAll().stream().map(o -> new UserDTO(o.getId(), o.getUsername(),o.getEmail(),o.getPassword(), o.getName())).collect(Collectors.toList()), HttpStatus.OK);
    }
    @RequestMapping(value="/users",method = RequestMethod.POST)
    public ResponseEntity<Object> createUser(@RequestBody UserDTO userDTO)
    {
        userDTOMap.put(userDTO.getId(),userDTO);
        User user=new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setName(userDTO.getName());
        userRepository.save(user);
        return new ResponseEntity<>("User created",HttpStatus.OK);
    }
    @RequestMapping(value="/login",method = RequestMethod.POST)
    public String loginUser(@RequestBody LoginDTO loginDTO)
    {
       if(userRepository.findByUsername(loginDTO.username)==null)
       {
           return "this user doesnt exist";
       }


        token = new JwtTokenUtil();
       System.out.println("token here:"+ token);
        MyUserDetails userDetails= new MyUserDetails(userRepository.findByUsername(loginDTO.username));
        return token.generateToken(userDetails);

    }
}
