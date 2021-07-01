package com.brunobirck.usersapi.api.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserMinimalDTO {

	private Long id;
	private String name;
	private LocalDate birthday;
}
