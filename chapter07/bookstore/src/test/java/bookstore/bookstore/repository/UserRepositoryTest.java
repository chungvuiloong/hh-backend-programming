package bookstore.bookstore.repository;

import bookstore.bookstore.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@AutoConfigureMockMvc
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testCreateUser() {
        User user = new User("testuser", "password123", "test@example.com", "USER");
        User savedUser = userRepository.save(user);

        assertThat(savedUser.getId()).isNotNull();
    }

    @Test
    public void testDeleteUser() {
        User user = new User("deleteuser", "password456", "delete@example.com", "ADMIN");
        User savedUser = userRepository.save(user);

        userRepository.deleteById(savedUser.getId());

        assertThat(userRepository.findById(savedUser.getId())).isEmpty();
    }

    @Test
    public void testFindByUsername() {
        User user = new User("john_doe", "hash123", "john@example.com", "USER");
        userRepository.save(user);

        User foundUser = userRepository.findByUsername("john_doe");

        assertThat(foundUser).isNotNull();
        assertThat(foundUser.getEmail()).isEqualTo("john@example.com");
    }
}
