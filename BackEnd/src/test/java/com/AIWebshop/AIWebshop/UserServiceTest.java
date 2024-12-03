package com.AIWebshop.AIWebshop;

import com.AIWebshop.AIWebshop.dao.UserDao;
import com.AIWebshop.AIWebshop.entity.User;
import com.AIWebshop.AIWebshop.service.UserServiceImp;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.data.jdbc.AutoConfigureDataJdbc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Mock
    private UserDao userDao;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImp userServiceImp;

    @Configuration
    static class TestConfig {
        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }
    }

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    public UserServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        List<User> users = Arrays.asList(new User(), new User());
        when(userDao.findAll()).thenReturn(users);

        List<User> result = userServiceImp.findAll();
        assertEquals(2, result.size());
    }

    @Test
    public void testFindById() {
        User user = new User();
        user.setId(1);
        when(userDao.findById(1)).thenReturn(user);

        User result = userServiceImp.findById(1);
        assertEquals(1, result.getId());
    }

    @Test
    public void TestSave() {
        User user = new User();
        user.setPassword("plainPassword");
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        userServiceImp.save(user);
        verify(passwordEncoder, times(1)).encode("plainPassword");
    }

    @Test
    public void testDeleteById() {
        User user = new User();
        user.setId(1);
        when(userDao.findById(1)).thenReturn(user);

        userServiceImp.deleteById(1);
        verify(userDao, times(1)).deleteById(user);
    }
}
