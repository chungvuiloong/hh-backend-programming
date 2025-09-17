// package bookstore.bookstore.controller;

// import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestMapping;

// import bookstore.bookstore.model.Category;
// import bookstore.bookstore.repository.CategoryRepository;
// import org.springframework.ui.Model;

// @Controller
// @RequestMapping("/categories")
// public class CategoryController {

//     private CategoryRepository categoryRepository;

//     public CategoryController(CategoryRepository categoryRepository) {
//         this.categoryRepository = categoryRepository;
//     }

//     @GetMapping("/")
//     public String getCategories(Model model) {
//         model.addAttribute("categories", categoryRepository.findAll());
//         model.addAttribute("category", new Category());
//         return "categories";
//     }

//     @GetMapping("/add")
//     public String addCategoryForm(Model model) {
//         model.addAttribute("category", new Category());
//         return "addcategory";
//     }

//     @PostMapping({"/", "/add"})
//     public String addCategory(Category category) {
//         categoryRepository.save(category);
//         return "redirect:/categories/";
//     }

//     @GetMapping("/edit/{id}")
//     public String editCategory(@PathVariable Long id, Model model) {
//         Category category = categoryRepository.findById(id).orElse(new Category());
//         model.addAttribute("category", category);
//         return "editcategory";
//     }

//     @PostMapping("/edit/{id}")
//     public String updateCategory(@PathVariable Long id, Category category) {
//         category.setId(id);
//         categoryRepository.save(category);
//         return "redirect:/categories/";
//     }

//     @GetMapping("/delete/{id}")
//     public String deleteCategory(@PathVariable Long id) {
//         categoryRepository.deleteById(id);
//         return "redirect:/categories/";
//     }
// }