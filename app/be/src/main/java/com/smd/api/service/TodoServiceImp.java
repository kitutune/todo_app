package com.smd.api.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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
                dateFormatToString(todoE.getProductionDate()),
                dateFormatToString(todoE.getFinalDeadline()),
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
        TodoEntity todoE = new TodoEntity(todoF.getId(),
                dateFormatToDate(todoF.getProductionDate()),
                dateFormatToDate(todoF.getFinalDeadline()),
                todoF.getTodo(),
                todoF.getIsDone(),
                todoF.getPriority());

        System.out.println(todoE.getTodo());
        // Jpaの機能でDBに登録する
        todoRepository.save(todoE);

        return ResponseEntity.ok(todoE);
    }

    @Override
    public TodoForm getTodoById(Integer id) {
        // DBからidでtodoデータを取得
        TodoEntity todoE = todoRepository.getReferenceById(id);
        // EntityをFormにコンバート
        TodoForm todoF = new TodoForm(
                todoE.getId(),
                dateFormatToString(todoE.getProductionDate()),
                dateFormatToString(todoE.getFinalDeadline()),
                todoE.getTodo(),
                todoE.getIsDone(),
                todoE.getPriority());
        return todoF;
    }

    @Override
    public ResponseEntity<TodoEntity> updateTodo(Integer id, TodoForm todoF) {
        // DBからidでtodoデータを取得
        TodoEntity todoE = todoRepository.getReferenceById(id);
        // 受け取ったTodoFormを登録済みのTodoEntityに上書きする（編集する）
        todoE.setPriority(todoF.getPriority());
        todoE.setTodo(todoF.getTodo());
        todoE.setProductionDate(dateFormatToDate(todoF.getProductionDate()));
        todoE.setFinalDeadline(dateFormatToDate(todoF.getFinalDeadline()));
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

    /**
     * EntityからFormに日付を渡す処理
     * 
     * @param DBから取得したDate(java.sql.Date)
     * @return "yyyy-MM-dd"形式のString
     */
    @Override
    public String dateFormatToString(Date input) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(input);
    }

    /**
     * FormからEntityに日付を渡す処理
     * 
     * @param input FEから受け取ったDate
     * @return "yyyy-MM-dd"にフォーマットしたDate
     */
    @Override
    public Date dateFormatToDate(String input) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return sdf.parse(input);
        } catch (ParseException e) {
            System.out.println(e.getMessage());
            // e.printStackTrace();
            return null;
        }

    }

}
