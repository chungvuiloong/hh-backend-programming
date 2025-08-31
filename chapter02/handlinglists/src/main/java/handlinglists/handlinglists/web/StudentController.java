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
        students.add(new Student("Kate", "Cole"));
        students.add(new Student("Dan", "Brown"));
        students.add(new Student("Mike", "Mars"));
        model.addAttribute("students", students);
        
        return "hello";
    }
}
