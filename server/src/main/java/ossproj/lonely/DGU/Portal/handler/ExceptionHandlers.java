package ossproj.lonely.DGU.Portal.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ossproj.lonely.DGU.Portal.dto.exception.ErrorDto;
import ossproj.lonely.DGU.Portal.exception.CustomException;
import ossproj.lonely.DGU.Portal.exception.InvalidAccessTokenException;

@Slf4j
@RestControllerAdvice
public class ExceptionHandlers {
    @ExceptionHandler({CustomException.class})
    public ResponseEntity<ErrorDto> handleCustomException(CustomException e) {
        log.error("error = {}", e.getErrorCode().getCode());
        ErrorDto errorDto = ErrorDto.builder().code(e.getErrorCode().getCode()).build();
        return new ResponseEntity<>(errorDto, e.getErrorCode().getHttpStatus());
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<ErrorDto> handleValidationException(MethodArgumentNotValidException e){
        log.error("error = {}", e.getStatusCode());
        ErrorDto errorDto = ErrorDto.builder().code(e.getMessage()).build();
        return new ResponseEntity<>(errorDto,e.getStatusCode());
    }

    @ExceptionHandler({InvalidAccessTokenException.class})
    public ResponseEntity<ErrorDto> handleInvalidAccessTokenException(InvalidAccessTokenException e) {
        log.error("error = {}", e.getMessage());
        ErrorDto errorDto = ErrorDto.builder().code(e.getMessage()).build();
        return new ResponseEntity<>(errorDto, HttpStatus.UNAUTHORIZED);
    }
}
