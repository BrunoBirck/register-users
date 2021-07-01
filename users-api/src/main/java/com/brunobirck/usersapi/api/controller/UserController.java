package com.brunobirck.usersapi.api.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brunobirck.usersapi.api.model.UserDTO;
import com.brunobirck.usersapi.api.model.UserMinimalDTO;
import com.brunobirck.usersapi.domain.model.User;
import com.brunobirck.usersapi.domain.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@GetMapping
	public List<UserMinimalDTO> getUsers() {
		return this.getUserMinimalCollection(userService.findUsers());
	}
	
	private List<UserMinimalDTO> getUserMinimalCollection(List<User> users) {
		return users.stream().map(this::getUserMinimal).collect(Collectors.toList());
	}
	
	private UserMinimalDTO getUserMinimal(User user) {
		return modelMapper.map(user, UserMinimalDTO.class);
	};

	@GetMapping("/{id}")
	public UserDTO getUser(@PathVariable Long id) {
		return this.getDTOFromEntity(userService.findUser(id));
	}
	
	@PostMapping
//	@RequestMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public UserDTO createUser(@RequestBody UserDTO user) {
		return this.getDTOFromEntity(userService.save(this.getEntityFromDTO(user)));
	}
	
	@PutMapping("/{id}")
	public UserDTO updateUser(@PathVariable Long id, @RequestBody UserDTO user) {
		User userFinded= userService.findUser(id);
		User userParsed= this.getEntityFromDTO(user);
		BeanUtils.copyProperties(userParsed, userFinded, "id");
		return this.getDTOFromEntity(userService.save(userFinded));
	}

	@DeleteMapping("/{id}")
	public void removeUser(@PathVariable Long id) {
		userService.deleteUser(id);
	}
	
	private User getEntityFromDTO (UserDTO dto) {
		User user = new User();
		user.setName(dto.getName());
		user.setId(dto.getId());
		user.setBirthday(dto.getBirthday());
		user.setPhoto(Base64Utils.decodeFromString(dto.getPhoto()));
		return user;
	}
	
	private UserDTO getDTOFromEntity (User user) {
		UserDTO userDTO = new UserDTO();
		userDTO.setName(user.getName());
		userDTO.setId(user.getId());
		userDTO.setBirthday(user.getBirthday());
		userDTO.setPhoto(Base64Utils.encodeToString(user.getPhoto()));
		return userDTO;
	}
}
