package com.brunobirck.usersapi.domain.model;

import javax.persistence.Embeddable;

import lombok.Data;

@Data
@Embeddable
public class Photo {
	
	private byte[] content;
}
