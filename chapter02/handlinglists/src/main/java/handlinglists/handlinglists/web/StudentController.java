package handlinglists.handlinglists.web;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;
import handlinglists.handlinglists.domain.Student;
import java.util.ArrayList;
import java.util.List;

@Controller
public class StudentController {
    @GetMapping("/hello")
    public String hello(Model model) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("John", "Doe"));
        students.add(new Student("Jane", "Smith"));
        students.add(new Student("Bob", "Johnson"));
        students.add(new Student("Alice", "Brown"));
        
        model.addAttribute("students", students);
        
        return "hello";
    }
}
