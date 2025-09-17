package bookstore.bookstore.repository;

import bookstore.bookstore.model.MongoBook;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MongoBookRepository extends MongoRepository<MongoBook, String> {
}