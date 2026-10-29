package com.supportdesk.ticket.service;

import com.supportdesk.ticket.entity.Comment;
import com.supportdesk.ticket.entity.Ticket;
import com.supportdesk.ticket.entity.TicketStatus;
import com.supportdesk.ticket.repository.CommentRepository;
import com.supportdesk.ticket.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final CommentRepository commentRepository;

    public List<Ticket> getAllTickets(String filter) {
        if ("MINE".equalsIgnoreCase(filter)) {
            return ticketRepository.findByAssignee("Arun Dua");
        } else if ("UNASSIGNED".equalsIgnoreCase(filter)) {
            return ticketRepository.findByAssigneeIsNull();
        } else if ("OPEN".equalsIgnoreCase(filter)) {
            return ticketRepository.findByStatus(TicketStatus.OPEN);
        }
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket nahi mila ID: " + id));
    }

    @Transactional
    public Ticket createTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    @Transactional
    public Comment addComment(Long ticketId, Comment comment) {
        Ticket ticket = getTicketById(ticketId);
        comment.setTicket(ticket);
        return commentRepository.save(comment);
    }
}