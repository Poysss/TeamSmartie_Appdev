package com.g3appdev.smartie.Service;

import com.g3appdev.smartie.Entity.Student;
import com.g3appdev.smartie.Repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepo;

    public Student saveStudent(Student student){
        return studentRepo.save(student);
    }

    public List<Student> getAllStudents(){
        return studentRepo.findAll();
    }

    public Student updateStudent(Student student){

        Student updateStudent=studentRepo.findById(student.getStudentId()).orElse(null);

        if(updateStudent!=null) {
            updateStudent.setFirstName(student.getFirstName());
            updateStudent.setLastName(student.getLastName());
            updateStudent.setStudentEmail(student.getStudentEmail());
            updateStudent.setStudentUsername(student.getStudentUsername());
            updateStudent.setStudentPassword(student.getStudentPassword());
            studentRepo.save(updateStudent);
            return updateStudent;
        }
        return null;
    }

    public String deleteStudent(long studentId){
        studentRepo.deleteById(studentId);
        return "deleted" + studentId;
    }
}
