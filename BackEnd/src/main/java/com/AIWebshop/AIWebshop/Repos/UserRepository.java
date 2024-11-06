package com.AIWebshop.AIWebshop.Repos;

import com.AIWebshop.AIWebshop.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
