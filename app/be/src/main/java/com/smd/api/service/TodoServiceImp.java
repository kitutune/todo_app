package com.smd.api.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.smd.api.entity.TodoEntity;
import com.smd.api.form.TodoForm;
import com.smd.api.repository.TodoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoServiceImp implements TodoService {
    private final TodoRepository todoRepository;

    @Override
    public List<TodoForm> getAllTodo() {
        List<TodoEntity> todoListE = todoRepository.findAll();
        List<TodoForm> todoListF = todoListE.stream().map(todoE -> new TodoForm(
                todoE.getId(),
                todoE.getProductionDate(),
                todoE.getFinalDeadline(),
                todoE.getTodo(),
                todoE.getIsDone(),
                todoE.getPriority()

        )).collect(Collectors.toList());
        return todoListF;
    }
    // // FE側で表示するためのtodolistを受け取るインスタンスを作成
    // List<TodoForm> todoListF = new ArrayList<TodoForm>();
    // // Jpaの機能でDBから全てのtodoデータを取得
    // System.out.println("todolistE");
    // // System.out.println(todolistE);
    // todoRepository.findAll().forEach(s-> System.out.prinltln(s));

    // System.out.println(todoRepository.findById(1));
    // System.out.println("todoListF");
    // System.out.println(todoListF);
    // // 同じ項目名の場合はcopyPropertiesでコピーできる
    // // BeanUtils.copyProperties(元になるBean,コピー先のBean)
    // BeanUtils.copyProperties(todoListE, todoListF);

    // return todoListF;
    // }

    @Override
    public ResponseEntity<TodoEntity> saveTodo(TodoForm todoF) {
        // TodoFormをDBに登録できるように受け取るTodoEntityのインスタンスを作成
        TodoEntity todoE = new TodoEntity();
        // FormをEntityにコンバート
        BeanUtils.copyProperties(todoF, todoE);
        System.out.println(todoE.getTodo());
        // Jpaの機能でDBに登録する
        todoRepository.save(todoE);
        return ResponseEntity.ok(todoE);
    }

    @Override
    public TodoForm getTodoById(Integer id) {
        // FE側に返すようのTodoFormインスタンスを作成
        TodoForm todoF = new TodoForm();
        // DBからidでtodoデータを取得
        TodoEntity todoE = todoRepository.getReferenceById(id);
        // EntityをFormにコンバート
        BeanUtils.copyProperties(todoE, todoF);
        return todoF;
    }

    @Override
    public ResponseEntity<TodoEntity> updateTodo(Integer id, TodoForm todoF) {
        // DBからidでtodoデータを取得
        TodoEntity todoE = todoRepository.getReferenceById(id);
        // 受け取ったTodoFormを登録済みのTodoEntityに上書きする（編集する）
        todoE.setPriority(todoF.getPriority());
        todoE.setTodo(todoF.getTodo());
        todoE.setProductionDate(todoF.getProductionDate());
        todoE.setFinalDeadline(todoF.getFinalDeadline());
        todoE.setIsDone(todoF.getIsDone());
        todoRepository.save(todoE);
        System.out.println(todoF.getTodo() == todoRepository.getReferenceById(id).getTodo());
        return ResponseEntity.ok(todoE);
    }

    @Override
    public boolean deleteTodo(Integer id) {
        // 受け取ったidからDBの対応するtodoを削除
        todoRepository.deleteById(id);
        return true;
    }

    @Override
    public boolean allDeleteTodo() {
        // 全てのtodoデータを削除する
        todoRepository.deleteAll();
        return true;
    }

    @Override
    public String toggleIsDone(Integer id) {
        // DBからidでtodoデータを取得
        TodoEntity todoE = todoRepository.getReferenceById(id);
        // todoEntityのisDone値を現在の状態から反転させる
        Boolean bool = Boolean.valueOf(todoE.getIsDone());
        // isDoneの中身がtrueの場合
        if (bool) {
            // falseを設定
            System.out.println("false");
            todoE.setIsDone("false");
            // それ以外の場合(isDoneの中身がfalseの場合)
        } else {
            // trueを設定
            System.out.println("true");
            todoE.setIsDone("true");
        }
        todoRepository.save(todoE);
        return todoE.getIsDone();
    }

    // BeanUtils.copyPropertiesはListもコピーできるので下記メソッドは必要ない
    // // @Override
    // // public TodoEntity convertFormToEntity(TodoForm todoF) {
    // // // 取得したTodoFormをコピーするEntityのインスタンスを作成する
    // // TodoEntity todoE = new TodoEntity();
    // // // 同じ項目名の場合はcopyPropertiesでコピーできる
    // // // BeanUtils.copyProperties(元になるBean,コピー先のBean)
    // // BeanUtils.copyProperties(todoF, todoE);
    // // return todoE;
    // // }

    // // @Override
    // // public TodoForm convertEntityToForm(TodoEntity todoE) {
    // // // 取得したTodoEntityをコピーするFormのインスタンスを作成する
    // // TodoForm todoF = new TodoForm();
    // // // 同じ項目名の場合はcopyPropertiesでコピーできる
    // // // BeanUtils.copyProperties(元になるBean,コピー先のBean)
    // // BeanUtils.copyProperties(todoE, todoF);
    // // return todoF;
    // // }

}
