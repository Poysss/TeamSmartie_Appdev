package com.g3appdev.smartie.Controller;

import com.g3appdev.smartie.Entity.Student;
import com.g3appdev.smartie.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/student/add")
    public Student postDetails(@RequestBody Student student){
        return studentService.saveStudent(student);
    }

    @GetMapping("/student/get")
    public List<Student> getStudents(){
        return studentService.getAllStudents();
    }

    @PutMapping("/student/update")
    public Student updateStudent(@RequestBody Student student) {
        return studentService.updateStudent(student);
    }

    @DeleteMapping("/student/delete/{studentId}")
    public String deleteStudent(@PathVariable long studentId){
        return studentService.deleteStudent(studentId);
    }
}
