package ossproj.lonely.DGU.Portal.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "USER NOT FOUND"),
    LOGIN_FAILED(HttpStatus.BAD_REQUEST, "LOGIN FAILED"),
    DUPLICATE_USER(HttpStatus.BAD_REQUEST, "DUPLICATE USER"),
    INVALID_REQUEST(HttpStatus.BAD_REQUEST, "INVALID REQUEST"),
    WRONG_PASSWORD(HttpStatus.BAD_REQUEST, "WRONG PASSWORD"),
    COURSE_NOT_FOUND(HttpStatus.NOT_FOUND, "COURSE NOT FOUND"),

    ;

    private final HttpStatus httpStatus;
    private final String code;

    ErrorCode(HttpStatus httpStatus, String code) {
        this.httpStatus = httpStatus;
        this.code = code;
    }
}
