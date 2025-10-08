package bookstore.bookstore.repository;

import bookstore.bookstore.model.Category;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@AutoConfigureMockMvc
public class CategoryRepositoryTest {

    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    public void testCreateCategory() {
        Category category = new Category("Fiction");
        Category savedCategory = categoryRepository.save(category);

        assertThat(savedCategory.getId()).isNotNull();
    }

    @Test
    public void testDeleteCategory() {
        Category category = new Category("Mystery");
        Category savedCategory = categoryRepository.save(category);

        categoryRepository.deleteById(savedCategory.getId());

        assertThat(categoryRepository.findById(savedCategory.getId())).isEmpty();
    }

    @Test
    public void testFindByName() {
        Category category = new Category("Romance");
        categoryRepository.save(category);

        Category foundCategory = categoryRepository.findByName("Romance");

        assertThat(foundCategory).isNotNull();
        assertThat(foundCategory.getName()).isEqualTo("Romance");
    }
}
