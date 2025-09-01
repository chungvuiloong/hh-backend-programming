package friendlist.friendlist.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import friendlist.friendlist.domain.Friend;
import org.springframework.ui.Model;

@Controller
public class FriendListController {
    List<Friend> friends = new ArrayList<>(
        List.of(
            new Friend("Minna", "Pellikka"),
            new Friend("Tanja", "Bergius"),
            new Friend("Jukka", "Juslin")
        )
    );


    @GetMapping("/")
    public String getFriends(Model model) {
        model.addAttribute("friends", friends);
        return "friendsList";
    }
}
