package friendlist.friendlist.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import friendlist.friendlist.domain.Friend;

import org.springframework.ui.Model;

@Controller
public class FriendListController {
    @GetMapping("/")
    public String getFriends(Model model) {
        List<Friend> friends = new ArrayList<>();
        friends.add(new Friend("Minna",  "Pellikka"));
        friends.add(new Friend("Tanja", "Bergius"));
        friends.add(new Friend("Jukka", "Juslin"));
        model.addAttribute("friends", friends);
        return "friendsList";
        }
}
