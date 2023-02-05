package edu.example.demospring.repository;

import edu.example.demospring.model.UserDTO;
import edu.example.demospring.persitence.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User,Long> {
    List<User> findAll();

    Optional<User> findById(Long id);
    User findByUsername(String username);
}
