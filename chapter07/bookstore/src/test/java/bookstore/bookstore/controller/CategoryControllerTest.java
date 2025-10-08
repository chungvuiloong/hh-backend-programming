package bookstore.bookstore.controller;

import bookstore.bookstore.model.Category;
import bookstore.bookstore.repository.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@AutoConfigureMockMvc
public class CategoryControllerTest {

    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    public void testCreateCategory() {
        Category category = new Category("Test Category");
        Category savedCategory = categoryRepository.save(category);

        assertThat(savedCategory.getId()).isNotNull();
        assertThat(savedCategory.getName()).isEqualTo("Test Category");
    }

    @Test
    public void testDeleteCategory() {
        Category category = new Category("Category to Delete");
        Category savedCategory = categoryRepository.save(category);
        Long categoryId = savedCategory.getId();

        categoryRepository.deleteById(categoryId);

        assertThat(categoryRepository.findById(categoryId)).isEmpty();
    }
}
