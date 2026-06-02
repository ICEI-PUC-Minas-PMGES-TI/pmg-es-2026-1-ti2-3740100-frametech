package com.example.back.repository;

import com.example.back.model.MensagemChat;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MensagemChatRepository
        extends JpaRepository<MensagemChat, Long> {

    List<MensagemChat>
    findByEvento_IdOrderByIdAsc(
            Long eventoId
    );
}