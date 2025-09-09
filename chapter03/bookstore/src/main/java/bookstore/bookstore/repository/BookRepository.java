package bookstore.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import bookstore.bookstore.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
    
}