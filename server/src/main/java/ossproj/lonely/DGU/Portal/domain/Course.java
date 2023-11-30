package ossproj.lonely.DGU.Portal.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Long id;

    @Column(name = "course_code", unique = true)
    private String courseCode;

    @Column(name = "course_name")
    private String courseName;

    @Column(name = "professor")
    private String professor;

    @Column(name = "is_online")
    private boolean isOnline;

    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
    private List<Enrollment> enrollments;

    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
    private List<Announcement> announcements;

    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
    private List<Assignment> assignments;

    public Course() {}
}
