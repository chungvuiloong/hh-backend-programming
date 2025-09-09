package bookstore.bookstore.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import bookstore.bookstore.model.Book;
import org.springframework.ui.Model;

@Controller
public class BookController {
    List<Book> books = new ArrayList<>(
        List.of(
            new Book("Minna", "Pellikka", 2020, "1234567890123", 29.99),
            new Book("Tanja", "Bergius", 2019, "1234567890124", 19.99),
            new Book("Jukka", "Juslin", 2021, "1234567890125", 39.99)
        )
    );

    @RequestMapping("/index")
    public String getIndex() {
        return "index";
    }

    @GetMapping("/")
    public String getBooks(Model model) {
        model.addAttribute("books", books);
        model.addAttribute("book", new Book());
        return "index";
    }

}
