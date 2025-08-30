package homework02.homework02;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@SpringBootApplication
public class Homework02Application {

	public static void main(String[] args) {
		SpringApplication.run(Homework02Application.class, args);
	}

    @Controller
    public class MyController {
        @RequestMapping("/index")
            public String home() {
            return "index";
        }

        @GetMapping("/hello")
        public String getHelloAPI(
            @RequestParam(name = "name", required = false, defaultValue = "") String name,
            @RequestParam(name = "age", required = false, defaultValue = "0") int age
        ) {
            return "Welcome to the " + name + " " + age + "!";
        }
    }
}
