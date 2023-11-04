package ossproj.lonely.DGU.Portal.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import ossproj.lonely.DGU.Portal.exception.ErrorCode;

import javax.naming.AuthenticationException;
import java.io.IOException;

@Slf4j
public class LoginFailedHandler extends SimpleUrlAuthenticationFailureHandler {
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/plain; charset=UTF-8");
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("code", ErrorCode.LOGIN_FAILED.getCode());
        response.getWriter().write(jsonObject.toString());
        log.error("error = {}", ErrorCode.LOGIN_FAILED.getCode());
    }
}
