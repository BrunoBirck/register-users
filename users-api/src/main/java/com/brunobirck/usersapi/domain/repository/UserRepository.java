package com.brunobirck.usersapi.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brunobirck.usersapi.domain.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
