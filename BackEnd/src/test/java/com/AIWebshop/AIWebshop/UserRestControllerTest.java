package com.AIWebshop.AIWebshop;

import com.AIWebshop.AIWebshop.entity.Address;
import com.AIWebshop.AIWebshop.entity.User;
import com.AIWebshop.AIWebshop.rest.UserRestController;
import com.AIWebshop.AIWebshop.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class UserRestControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserRestController userRestController;

    public UserRestControllerTest(){
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll(){
        List<User> users = Arrays.asList(new User(), new User());
        when(userService.findAll()).thenReturn(users);

        List<User> result = userRestController.findAll();
        assertEquals(2,result.size());
    }

    @Test
    public void testFindById(){
        User user = new User();
        user.setId(1);
        when(userService.findById(1)).thenReturn(user);

        User result = userRestController.findById(1);
        assertEquals(1, result.getId());
    }

    @Test
    public void testUpdateUser(){
        User user = new User();
        user.setId(1);
        when(userService.save(user)).thenReturn(user);

        User result = userRestController.updateUser(user);
        assertEquals(1,result.getId());
    }

    @Test
    public void testDelete(){
        User user = new User();
        user.setId(1);
        when(userService.findById(1)).thenReturn(user);

        String result = userRestController.delete(1);
        assertEquals("DELETE", result);
        verify(userService, times(1)).deleteById(1);
    }

}
