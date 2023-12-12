package ossproj.lonely.DGU.Portal;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

import java.util.TimeZone;

import static java.util.TimeZone.*;

@SpringBootApplication
@ConfigurationPropertiesScan
public class DguPortalApplication {

	@PostConstruct
	public void init() {
		TimeZone.setDefault(getTimeZone("Asia/Seoul"));
	}

	public static void main(String[] args) {
		SpringApplication.run(DguPortalApplication.class, args);
	}

}
