package ossproj.lonely.DGU.Portal.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "todo")
public class Todo {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name = "todo_id")
    private Long id;

    @Column(name = "content")
    private String content;

    @Column(name = "is_completed")
    private boolean isCompleted;

    @CreatedDate
    @Column(name = "created_at")
    private java.time.LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public void updateContent(String content) {
        this.content = content;
    }

    public void updateIsCompleted(boolean isCompleted) {
        this.isCompleted = isCompleted;
    }
}
