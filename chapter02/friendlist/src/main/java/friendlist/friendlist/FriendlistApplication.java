package friendlist.friendlist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class FriendlistApplication {

	public static void main(String[] args) {
		SpringApplication.run(FriendlistApplication.class, args);
	}

    @Controller
    public class FriendlistController {
        @GetMapping("/")
        public String getFriends() {
            return "friendsList";
        }
    }

}
