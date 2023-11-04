package ossproj.lonely.DGU.Portal.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import ossproj.lonely.DGU.Portal.domain.User;
import ossproj.lonely.DGU.Portal.exception.ErrorCode;
import ossproj.lonely.DGU.Portal.repository.UserRepository;
import ossproj.lonely.DGU.Portal.utils.PrincipalDetails;

@RequiredArgsConstructor
@Component
public class PrincipalDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userCode) throws UsernameNotFoundException {
        User user = userRepository.findByUserCode(userCode)
                .orElseThrow(() -> new UsernameNotFoundException(ErrorCode.USER_NOT_FOUND.getCode()));

        return new PrincipalDetails(user);
    }
}
