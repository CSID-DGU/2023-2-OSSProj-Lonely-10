package ossproj.lonely.DGU.Portal.domain;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter @Setter
@Builder
@AllArgsConstructor
@Table(name = "`user`")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "user_code")
    private String userCode;

    @Column(name = "hash_password")
    private String hashPassword;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "user_email", unique = true)
    private String userEmail;

    @Column(name = "department")
    private String department;

    @Column(name = "semester")
    private Long semester;

    @Column(name = "major")
    private String major;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "refresh_token", nullable = true)
    private String refreshToken;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Grade> grades;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Todo> todos;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Enrollment> enrollments;

    public User() {}
}
