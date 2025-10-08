package bookstore.bookstore.repository;

import bookstore.bookstore.model.Book;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@AutoConfigureMockMvc
public class BookRepositoryTest {

    @Autowired
    private BookRepository bookRepository;

    @Test
    public void testCreateBook() {
        Book book = new Book("Test Book", "Test Author", 2024, "1234567890", 29.99, List.of());
        Book savedBook = bookRepository.save(book);

        assertThat(savedBook.getId()).isNotNull();
    }

    @Test
    public void testDeleteBook() {
        Book book = new Book("Book to Delete", "Author", 2023, "9876543210", 19.99, List.of());
        Book savedBook = bookRepository.save(book);

        bookRepository.deleteById(savedBook.getId());

        assertThat(bookRepository.findById(savedBook.getId())).isEmpty();
    }

    @Test
    public void testFindByTitle() {
        Book book = new Book("Unique Title", "Author One", 2022, "1111111111", 15.99, List.of());
        bookRepository.save(book);

        List<Book> foundBooks = bookRepository.findByTitle("Unique Title");

        assertThat(foundBooks).hasSize(1);
        assertThat(foundBooks.get(0).getAuthor()).isEqualTo("Author One");
    }
}
