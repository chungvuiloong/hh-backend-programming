package bookstore.bookstore.service;
import org.springframework.stereotype.Service;

import java.util.List;

import bookstore.bookstore.repository.MongoBookRepository;
import bookstore.bookstore.model.MongoBook;

@Service
public class MongoBookService {

    private final MongoBookRepository bookRepository;

    public MongoBookService(MongoBookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<MongoBook> getAllBooks() {
        return bookRepository.findAll();
    }
}