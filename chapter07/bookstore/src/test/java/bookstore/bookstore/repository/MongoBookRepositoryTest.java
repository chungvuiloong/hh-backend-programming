package bookstore.bookstore.repository;

import bookstore.bookstore.model.MongoBook;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataMongoTest
public class MongoBookRepositoryTest {

    @Autowired
    private MongoBookRepository mongoBookRepository;

    @Test
    public void testCreateMongoBook() {
        MongoBook book = new MongoBook();
        book.setTitle("MongoDB Test Book");
        book.setAuthor("Test Author");
        book.setPublicationYear(2024);
        book.setIsbn("1234567890123");
        book.setPrice(29.99);
        book.setCategoryNames(List.of("Fiction", "Adventure"));

        MongoBook savedBook = mongoBookRepository.save(book);

        assertThat(savedBook.getId()).isNotNull();
        assertThat(savedBook.getTitle()).isEqualTo("MongoDB Test Book");
        assertThat(savedBook.getAuthor()).isEqualTo("Test Author");
        assertThat(savedBook.getPublicationYear()).isEqualTo(2024);
        assertThat(savedBook.getIsbn()).isEqualTo("1234567890123");
        assertThat(savedBook.getPrice()).isEqualTo(29.99);
        assertThat(savedBook.getCategoryNames()).containsExactly("Fiction", "Adventure");
    }

    @Test
    public void testDeleteMongoBook() {
        MongoBook book = new MongoBook();
        book.setTitle("Book to Delete");
        book.setAuthor("Author Name");
        book.setPublicationYear(2023);
        book.setIsbn("9876543210123");
        book.setPrice(19.99);
        book.setCategoryNames(List.of("Horror"));

        MongoBook savedBook = mongoBookRepository.save(book);
        String bookId = savedBook.getId();

        mongoBookRepository.deleteById(bookId);

        Optional<MongoBook> deletedBook = mongoBookRepository.findById(bookId);
        assertThat(deletedBook).isEmpty();
    }

    @Test
    public void testFindAll() {
        mongoBookRepository.deleteAll();

        MongoBook book1 = new MongoBook();
        book1.setTitle("First MongoDB Book");
        book1.setAuthor("Author A");
        book1.setPublicationYear(2023);
        book1.setIsbn("1111111111111");
        book1.setPrice(10.99);
        book1.setCategoryNames(List.of("Fiction"));

        MongoBook book2 = new MongoBook();
        book2.setTitle("Second MongoDB Book");
        book2.setAuthor("Author B");
        book2.setPublicationYear(2022);
        book2.setIsbn("2222222222222");
        book2.setPrice(14.99);
        book2.setCategoryNames(List.of("Non-Fiction"));

        MongoBook book3 = new MongoBook();
        book3.setTitle("Third MongoDB Book");
        book3.setAuthor("Author C");
        book3.setPublicationYear(2021);
        book3.setIsbn("3333333333333");
        book3.setPrice(20.99);
        book3.setCategoryNames(List.of("Mystery"));

        mongoBookRepository.save(book1);
        mongoBookRepository.save(book2);
        mongoBookRepository.save(book3);

        List<MongoBook> allBooks = mongoBookRepository.findAll();

        assertThat(allBooks).hasSize(3);
    }

    @Test
    public void testUpdateMongoBook() {
        MongoBook book = new MongoBook();
        book.setTitle("Original Title");
        book.setAuthor("Original Author");
        book.setPublicationYear(2020);
        book.setIsbn("4444444444444");
        book.setPrice(30.99);
        book.setCategoryNames(List.of("Fiction"));

        MongoBook savedBook = mongoBookRepository.save(book);
        String bookId = savedBook.getId();

        savedBook.setTitle("Updated Title");
        savedBook.setAuthor("Updated Author");
        savedBook.setPrice(35.99);
        savedBook.setCategoryNames(List.of("Fiction", "Drama"));
        mongoBookRepository.save(savedBook);

        Optional<MongoBook> updatedBook = mongoBookRepository.findById(bookId);

        assertThat(updatedBook).isPresent();
        assertThat(updatedBook.get().getTitle()).isEqualTo("Updated Title");
        assertThat(updatedBook.get().getAuthor()).isEqualTo("Updated Author");
        assertThat(updatedBook.get().getPrice()).isEqualTo(35.99);
        assertThat(updatedBook.get().getCategoryNames()).containsExactly("Fiction", "Drama");
    }

    @Test
    public void testFindById() {
        MongoBook book = new MongoBook();
        book.setTitle("Findable Book");
        book.setAuthor("Findable Author");
        book.setPublicationYear(2024);
        book.setIsbn("5555555555555");
        book.setPrice(25.99);
        book.setCategoryNames(List.of("Thriller"));

        MongoBook savedBook = mongoBookRepository.save(book);
        String bookId = savedBook.getId();

        Optional<MongoBook> foundBook = mongoBookRepository.findById(bookId);

        assertThat(foundBook).isPresent();
        assertThat(foundBook.get().getTitle()).isEqualTo("Findable Book");
        assertThat(foundBook.get().getAuthor()).isEqualTo("Findable Author");
    }
}
