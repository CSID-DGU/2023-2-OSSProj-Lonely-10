package ossproj.lonely.DGU.Portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class DguPortalApplication {

	public static void main(String[] args) {
		SpringApplication.run(DguPortalApplication.class, args);
	}

}
