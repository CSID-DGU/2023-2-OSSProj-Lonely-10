package ossproj.lonely.DGU.Portal.domain;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "enrollment")
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "enrollment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "enrollment", fetch = FetchType.LAZY)
    private List<Score> scores;

    @OneToMany(mappedBy = "enrollment", fetch = FetchType.LAZY)
    private List<Attendance> attendances;
}
