package bookstore.bookstore.model;

public class Book {
    String title;
    String author;
    int publicationYear;
    String isbn;
    double price;

    public Book(String title, String author, int publicationYear, String isbn, double price) {
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
        this.isbn = isbn;
        this.price = price;
    }
}