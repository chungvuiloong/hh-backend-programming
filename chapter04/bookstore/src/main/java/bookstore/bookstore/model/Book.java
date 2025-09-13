package bookstore.bookstore.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String author;
    private int publicationYear;
    private String isbn;
    double price;

    public Book() {
    }

    public Book(String title, String author, int publicationYear, String isbn, double price) {
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
        this.isbn = isbn;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public int getPublicationYear() {
        return publicationYear;
    }

    public String getIsbn() {
        return isbn;
    }

    public double getPrice() {
        return price;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String setTitle (String title) {
        return this.title = title;
    }
    public String setAuthor (String author) {
        return this.author = author;
    }
    public int setPublicationYear (int publicationYear) {
        return this.publicationYear = publicationYear;
    }
    public String setIsbn (String isbn) {
        return this.isbn = isbn;
    }
    public double setPrice (double price) {
        return this.price = price;
    }
}