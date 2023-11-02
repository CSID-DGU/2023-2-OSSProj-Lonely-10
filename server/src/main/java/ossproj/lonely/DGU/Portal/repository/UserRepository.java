package ossproj.lonely.DGU.Portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ossproj.lonely.DGU.Portal.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findbyUserCode(String userCode);
}
