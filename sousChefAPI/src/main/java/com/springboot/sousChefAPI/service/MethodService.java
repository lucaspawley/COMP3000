package com.springboot.sousChefAPI.service;

import com.springboot.sousChefAPI.model.Method;
import com.springboot.sousChefAPI.repository.MethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MethodService {
    @Autowired
    private MethodRepository methodRepository;

    public Method saveMethod(Method method) {
        return methodRepository.save(method);
    }

    public Optional<Method> findById(Integer id) {
        return methodRepository.findById(id);
    }

    public void deleteMethod(int id) {
        methodRepository.deleteById(id);
    }
}
