package bookstore.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import bookstore.bookstore.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(@Param("username") String username);
}