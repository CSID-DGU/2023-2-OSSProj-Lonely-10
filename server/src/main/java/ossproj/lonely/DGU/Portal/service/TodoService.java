package ossproj.lonely.DGU.Portal.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ossproj.lonely.DGU.Portal.domain.Todo;
import ossproj.lonely.DGU.Portal.exception.CustomException;
import ossproj.lonely.DGU.Portal.exception.ErrorCode;
import ossproj.lonely.DGU.Portal.repository.TodoRepository;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;

    @Transactional
    public Todo findById(Long todoId) {
        return todoRepository.findById(todoId).orElseThrow(() -> new CustomException(ErrorCode.INVALID_REQUEST));
    }

    @Transactional
    public List<Todo> findByUserCode(String userCode) {
        return todoRepository.findByUserCode(userCode);
    }
    @Transactional
    public void save(Todo todo) {
        todoRepository.save(todo);
    }

    @Transactional
    public void delete(Todo todo) {
        todoRepository.delete(todo);
    }

    @Transactional
    public void update(Todo todo) {
        todoRepository.save(todo);
    }
}
