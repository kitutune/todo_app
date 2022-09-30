package com.smd.api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smd.api.entity.TodoEntity;
import com.smd.api.form.TodoForm;
import com.smd.api.service.TodoServiceImp;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {
    private final TodoServiceImp todoServiceImp;

    /*
     * GET
     * 正常に動くかテスト用
     * curl -X GET http://localhost:8080/api/test
     */
    @GetMapping("/test")
    public String getTest() {
        return "test";
    }

    /*
     * GET
     * TodoリストをDBから取得し返す
     * 
     * @Return 全てのTodoデータ
     */
    @GetMapping("/all")
    public List<TodoForm> getAllTodo() {
        System.out.println("GET");
        System.out.println("getAllTodo");
        List<TodoForm> todolist = todoServiceImp.getAllTodo();
        return todolist;
    }

    /*
     * POST
     * FEから送られてきたTodoデータをDBに保存
     * 
     * @param formに入力されたTodoデータ
     * 
     * @return
     */
    @PostMapping("/regist")
    public ResponseEntity<TodoEntity> registerTodo(@RequestBody @Validated TodoForm todoF, BindingResult result) {
        if (result.hasErrors()) {
            System.out.println("error");
            // error処理
        }
        System.out.println("POST");
        System.out.println("registerTodo");
        return todoServiceImp.saveTodo(todoF);

    }

    /*
     * GET
     * FEから渡されたidから登録されているTodoデータをフロントに返す
     * 
     * @param 登録されているTodoデータのid
     * 
     * @return 渡されたidと一致しているTodoデータ
     */
    @GetMapping("/single/{id}")
    public TodoForm getTodoById(@PathVariable("id") Integer id) {
        System.out.println("GET");
        System.out.println("getTodoById");
        TodoForm todoF = todoServiceImp.getTodoById(id);
        return todoF;
    }

    /*
     * PUT
     * 
     * @param 編集後のTodoデータ
     * 
     * @return
     * Todoを上書き（編集）するメソッド
     */
    @PutMapping("/edit/{id}")
    public ResponseEntity<TodoEntity> editTodo(@PathVariable("id") Integer id, @RequestBody @Validated TodoForm todoF,
            BindingResult result) {
        if (result.hasErrors()) {
            System.out.println("error");
            // error処理
        }
        System.out.println("PUT");
        System.out.println("editTodo");
        System.out.println(todoF.getId());
        System.out.println(todoF.getProductionDate());
        System.out.println(todoF.getFinalDeadline());
        System.out.println(todoF.getTodo());
        System.out.println(todoF.getIsDone());
        System.out.println(todoF.getPriority());
        return todoServiceImp.updateTodo(id, todoF);
    }

    /*
     * DELETE
     * Todoを削除するメソッド
     * 
     * @param 削除したいTodoのid
     * 
     * @return 結果をbooleanで
     */
    @DeleteMapping("/delete/{id}")
    public boolean deleteTodo(@PathVariable("id") Integer id) {
        System.out.println("DELETE");
        System.out.println("deleteTodo");
        todoServiceImp.deleteTodo(id);
        return true;
    }

    /*
     * PUT
     * Todoの完了/未完了を切り替えるメソッド
     * 
     * @param チェックを切り替えたいTodoのid
     * 
     * @return 結果をbooleanで
     */
    @PutMapping("/toggle/isdone/{id}")
    public String isDone(@PathVariable("id") Integer id) {
        System.out.println("PUT");
        System.out.println("isDone");
        todoServiceImp.toggleIsDone(id);
        return "true";
    }

    /*
     * DELETE
     * Todoを全て削除するメソッド
     * 
     * @return 結果をbooleanで
     */
    @DeleteMapping("/alldelete")
    public boolean allDeleteTodo() {
        System.out.println("DELETE");
        System.out.println("allDeleteTodo");
        todoServiceImp.allDeleteTodo();
        return true;
    }
}
