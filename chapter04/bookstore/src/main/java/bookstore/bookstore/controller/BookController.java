package bookstore.bookstore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import bookstore.bookstore.model.Book;
import bookstore.bookstore.repository.BookRepository;
import org.springframework.ui.Model;

@Controller
public class BookController {

    private BookRepository repository;
    
    public BookController(BookRepository repository) {
        this.repository = repository;
        if (repository.count() == 0) {
            repository.save(new Book("Minna's Journey", "Minna Pellikka", 2020, "1234567890123", 29.99));
            repository.save(new Book("Tanja's Adventure", "Tanja Bergius", 2019, "1234567890124", 19.99));
            repository.save(new Book("Jukka's Quest", "Jukka Juslin", 2021, "1234567890125", 39.99));
        }
    }

    @GetMapping("/")
    public String getBooks(Model model) {
        model.addAttribute("books", repository.findAll());
        model.addAttribute("book", new Book());
        return "index";
    }

    @GetMapping("/addbook")
    public String addBookForm(Model model) {
        model.addAttribute("book", new Book());
        return "addbook";
    }

    @PostMapping({"/", "/addbook"})
    public String addBook(Book book) {
        repository.save(book);
        return "redirect:/";
    }

    @GetMapping("/edit/{id}")
    public String editBook(@PathVariable Long id, Model model) {
        Book book = repository.findById(id).orElse(new Book());
        model.addAttribute("book", book);
        return "edit";
    }

    @PostMapping("/edit/{id}")
    public String updateBook(@PathVariable Long id, Book book) {
        book.setId(id);
        repository.save(book);
        return "redirect:/";
    }

    @GetMapping("/delete/{id}")
    public String deleteBook(@PathVariable Long id) {
        repository.deleteById(id);
        return "redirect:/";
    }
}