package edu.example.demospring.dao;


import edu.example.demospring.persitence.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

@Repository
public class UserServiceDAO {

    private final EntityManager em;


    public UserServiceDAO(EntityManager em) {
        this.em = em;
    }
    public List<User> findProducts() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<User> cq = cb.createQuery(User.class);
        Root<User> from = cq.from(User.class);
        return em.createQuery(cq).getResultList();
    }
}
