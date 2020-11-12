package com.nalhin.fc.user;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id")
  private Long id;

  @Column(name = "username", unique = true)
  private String username;

  @Column(name = "email", unique = true)
  private String email;

  @Column(name = "password")
  private String password;
}
