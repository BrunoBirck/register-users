package com.brunobirck.usersapi.domain.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brunobirck.usersapi.domain.exception.EntityNotFound;
import com.brunobirck.usersapi.domain.model.User;
import com.brunobirck.usersapi.domain.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	public List<User> findUsers() {
		return userRepository.findAll();
	}

	public User save(User user) {
		return userRepository.save(user);
	}

	public User findUser(Long id) {
		return userRepository.findById(id).orElseThrow(()->new EntityNotFound("User not found!"));
	}

	public void deleteUser(Long id) {
		userRepository.deleteById(id);
	}
}
