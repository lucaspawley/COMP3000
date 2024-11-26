package com.springboot.sousChefAPI.repository;

import com.springboot.sousChefAPI.model.Method;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MethodRepository extends JpaRepository<Method, Integer> {
}
