package com.AIWebshop.AIWebshop.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "chat_messages")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "chat_id")
    private int id;
    @Column(name = "user_id")
    private int userId;
    @Column(length = 3500)
    private String message;
    @Column(length = 3500)
    private String question;

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


}
