package com.supportdesk.ticket.config;

import com.supportdesk.ticket.entity.Comment;
import com.supportdesk.ticket.entity.Priority;
import com.supportdesk.ticket.entity.Ticket;
import com.supportdesk.ticket.entity.TicketStatus;
import com.supportdesk.ticket.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {

    private final TicketRepository ticketRepository;

    @Override
    public void run(String... args) {
        Ticket t1 = Ticket.builder()
                .ticketKey("SUB-00185")
                .title("All connections have this issue")
                .description("Clients are unable to connect via standard ports. Raised 50 minutes ago by Arun Dua - Support Free Member.")
                .status(TicketStatus.IN_MONITORING)
                .priority(Priority.HIGH)
                .assignee("Arun Dua")
                .customerName("Aankur Medical Technologies")
                .build();

        Comment c1 = Comment.builder()
                .author("Support Bot")
                .message("Ticket assigned to Infra Team queue.")
                .ticket(t1)
                .build();

        t1.setComments(List.of(c1));

        Ticket t2 = Ticket.builder()
                .ticketKey("SUB-00189")
                .title("Server Stuck")
                .description("Core application instances are hanging under memory spike scenarios during background sync.")
                .status(TicketStatus.IN_MONITORING)
                .priority(Priority.HIGH)
                .assignee("Kavita Sharma")
                .customerName("Enterprise Cloud Core")
                .build();

        Ticket t3 = Ticket.builder()
                .ticketKey("SUB-00330")
                .title("Ankush Medical Technologies Portal Error")
                .description("Dashboard reports 500 error on medical record search index query.")
                .status(TicketStatus.OPEN)
                .priority(Priority.MEDIUM)
                .customerName("Aankur Medical Technologies")
                .build();

        ticketRepository.saveAll(List.of(t1, t2, t3));
    }
}