package fi.haagahelia.homework01;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class Homework01Application {

	public static void main(String[] args) {
		SpringApplication.run(Homework01Application.class, args);
	}

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, World!";
    }

}
