package bookstore.bookstore.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "books")
public class MongoBook {

    @Id
    private String id;
    private String title;
    private String author;
    private int publicationYear;
    private String isbn;
    private double price;
    private List<String> categoryNames;

    public void Book() {}

    public void Book(String title, String author, int publicationYear, String isbn, double price, List<String> categoryNames) {
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
        this.isbn = isbn;
        this.price = price;
        this.categoryNames = categoryNames;
    }

    public String getId() {
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
    public List<String> getCategoryNames() {
        return categoryNames;
    }

    public void setId(String id) {
        this.id = id;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public void setAuthor(String author) {
        this.author = author;
    }
    public void setPublicationYear(int publicationYear) {
        this.publicationYear = publicationYear;
    }
    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }
    public void setPrice(double price) {
        this.price = price;
    }
    public void setCategoryNames(List<String> categoryNames) {
        this.categoryNames = categoryNames;
    }

    @Override
    public String toString() {
        return "MongoBook [id=" + id + ", title=" + title + ", author=" + author + ", publicationYear=" + publicationYear
                + ", isbn=" + isbn + ", price=" + price + ", categoryNames=" + categoryNames + "]";
    }
}
