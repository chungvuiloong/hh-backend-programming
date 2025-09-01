package friendlist.friendlist.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import friendlist.friendlist.domain.Friend;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;

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
        model.addAttribute("friend", new Friend());
        return "friendsList";
    }

    @PostMapping("/add")
    public String addFriend(@ModelAttribute Friend friend) {
        friends.add(friend);
        return "redirect:/";
    }
    
}
