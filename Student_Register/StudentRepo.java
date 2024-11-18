package com.g3appdev.smartie.Repository;

import com.g3appdev.smartie.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<Student, Long> {
}




