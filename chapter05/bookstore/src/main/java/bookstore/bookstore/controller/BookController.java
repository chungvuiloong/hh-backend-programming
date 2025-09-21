package bookstore.bookstore.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;

import bookstore.bookstore.model.Book;
import bookstore.bookstore.model.Category;
import bookstore.bookstore.repository.BookRepository;
import bookstore.bookstore.repository.CategoryRepository;
import org.springframework.ui.Model;
import java.util.ArrayList;
import java.util.List;

@Controller
public class BookController {

    private BookRepository repository;
    private CategoryRepository categoryRepository;

    public BookController(BookRepository repository, CategoryRepository categoryRepository) {
        this.repository = repository;
        this.categoryRepository = categoryRepository;
        if (repository.count() == 0) {
            repository.save(new Book("Minna's Journey", "Minna Pellikka", 2020, "1234567890123", 29.99, List.of("Fiction", "Horror")));
            repository.save(new Book("Tanja's Adventure", "Tanja Bergius", 2019, "1234567890124", 19.99, List.of("Horror")));
            repository.save(new Book("Jukka's Quest", "Jukka Juslin", 2021, "1234567890125", 39.99, List.of("Non-Fiction")));
        }

        if (categoryRepository.count() == 0) {
            categoryRepository.save(new Category("Horror"));
            categoryRepository.save(new Category("Fiction"));
            categoryRepository.save(new Category("Non-Fiction"));
        }
    }

    @GetMapping("/")
    public String getBooks(Model model) {
        model.addAttribute("books", repository.findAll());
        model.addAttribute("book", new Book());
        return "index";
    }

    @RequestMapping(value = "/books", method = RequestMethod.GET)
    public @ResponseBody List<Book> bookListRest() {
        return (List<Book>) repository.findAll();
    }

    @RequestMapping(value = "/books/{id}", method = RequestMethod.GET)
    public @ResponseBody Book oneBook(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @GetMapping("/addbook")
    public String addBookForm(Model model) {
        model.addAttribute("book", new Book());
        model.addAttribute("categories", categoryRepository.findAll());
        return "addbook";
    }
    @PostMapping({"/", "/addbook"})
    public String addBook(Book book, Model model) {
        repository.save(book);
        return "redirect:/";
    }

    // Lesson to self: Dont overcomplicated things. Keep it simple.
    // @PostMapping({"/", "/addbook"})
    // public String addBook(Book book) {
    //     Book savedBook = repository.save(book);

    //     if (book.getCategoryNames() != null && !book.getCategoryNames().isEmpty()) {
    //         List<Category> categories = new ArrayList<>();
    //         for (String categoryName : book.getCategoryNames()) {
    //             Category category = categoryRepository.findByName(categoryName);
    //             if (category == null) {
    //                 category = new Category(categoryName);
    //             }
    //             category.setBook(savedBook); 
    //             category = categoryRepository.save(category);
    //             categories.add(category);
    //         }
    //         savedBook.setCategories(categories);
    //         repository.save(savedBook);
    //     }
    //     return "redirect:/";
    // }

    @GetMapping("/edit/{id}")
    public String editBook(@PathVariable Long id, Model model) {
        Book book = repository.findById(id).orElse(new Book());

        if (book.getCategories() != null && !book.getCategories().isEmpty()) {
            List<String> categoryNames = new ArrayList<>();
            for (Category category : book.getCategories()) {
                categoryNames.add(category.getName());
            }
            book.setCategoryNames(categoryNames);
        }

        model.addAttribute("book", book);
        return "edit";
    }

        @PostMapping("/edit/{id}")
        public String updateBook(@PathVariable Long id, Book book) {
            book.setId(id);
            repository.save(book);
            return "redirect:/";
        }

    // @PostMapping("/edit/{id}")
    // public String updateBook(@PathVariable Long id, Book book) {
    //     book.setId(id);

    //     Book existingBook = repository.findById(id).orElse(null);
    //     if (existingBook != null && existingBook.getCategories() != null) {
    //         for (Category category : existingBook.getCategories()) {
    //             category.setBook(null);
    //             categoryRepository.save(category);
    //         }
    //     }

    //     Book savedBook = repository.save(book);

    //     if (book.getCategoryNames() != null && !book.getCategoryNames().isEmpty()) {
    //         List<Category> categories = new ArrayList<>();
    //         for (String categoryName : book.getCategoryNames()) {
    //             Category category = categoryRepository.findByName(categoryName);
    //             if (category == null) {
    //                 category = new Category(categoryName);
    //             }
    //             category.setBook(savedBook);
    //             category = categoryRepository.save(category);
    //             categories.add(category);
    //         }
    //         savedBook.setCategories(categories);
    //         repository.save(savedBook);
    //     }

    //     return "redirect:/";
    // }

    @GetMapping("/delete/{id}")
    public String deleteBook(@PathVariable Long id) {
        repository.deleteById(id);
        return "redirect:/";
    }
}