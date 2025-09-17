package bookstore.bookstore.controller;

import bookstore.bookstore.model.MongoBook;
import bookstore.bookstore.service.MongoBookService;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/mongo")
public class MongoBookController {

    private final MongoBookService bookService;

    public MongoBookController(MongoBookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/test")
    public String getMongoTestPage(Model model) {
        List<MongoBook> books = bookService.getAllBooks();
        model.addAttribute("mongoBooks", books);
        return "mongo-test";
    }
}