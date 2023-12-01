package ossproj.lonely.DGU.Portal.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "course_info")
public class CourseInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_info_id")
    private Long id;

    @Column(name = "course_code")
    private String courseCode;

    @Column(name = "days")
    private String days;

    @Column(name = "classroom")
    private String classroom;

    @Column(name = "start_time")
    private String startTime;

    @Column(name = "end_time")
    private String endTime;
}
