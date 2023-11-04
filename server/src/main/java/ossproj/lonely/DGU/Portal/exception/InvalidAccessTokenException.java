package ossproj.lonely.DGU.Portal.exception;

import lombok.Getter;
import org.springframework.security.core.AuthenticationException;

@Getter
public class InvalidAccessTokenException extends AuthenticationException {
    private final String errorCode;

    public InvalidAccessTokenException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
}

