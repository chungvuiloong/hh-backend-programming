package handlinglists.handlinglists;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class HandlinglistsApplication {

	public static void main(String[] args) {
		SpringApplication.run(HandlinglistsApplication.class, args);
	}

    // @Controller
    // public class MyController {


    //     @GetMapping("/hello")
    //     public String getHelloAPI() {
    //         return "Welcome to the Haaga-Helia!";
    //     }
    // }

}
