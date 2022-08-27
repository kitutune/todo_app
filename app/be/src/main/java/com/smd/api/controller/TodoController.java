package com.smd.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
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
import com.smd.api.repository.TodoRepository;
import com.smd.api.service.TodoServiceImp;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {
    private final TodoServiceImp todoServiceImp;
    private final TodoRepository todoRepository;

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
     * 
     * @Return 全てのTodoデータ
     */
    @GetMapping("/all/todo")
    // @GetMapping
    public List<TodoForm> getAllTodo() {
        List<TodoForm> todolist = todoServiceImp.getAllTodo();
        // List<TodoForm> todolist = new ArrayList<TodoForm>();
        // // System.out.println(todolist);
        // System.out.println("きてる？");
        // // System.out.println(todolist);
        // System.out.println(todoRepository.findAll());
        // BeanUtils.copyProperties(todoRepository.findAll(), todolist);
        return todolist;
    }

    /*
     * POST
     * todoをDBに保存
     * 
     * @param formに入力されたtodoデータ
     * 
     * @return
     */
    @PostMapping("/regist/todo")
    // @PostMapping
    public ResponseEntity<TodoEntity> registerTodo(@RequestBody @Validated TodoForm todoF, BindingResult result) {
        if (result.hasErrors()) {
            // error処理
        }
        return todoServiceImp.saveTodo(todoF);

    }

    /*
     * GET
     * 渡されたidから登録されているtodoデータをフロントに返す
     * 
     * @param 登録されているtodoのid
     * 
     * @return 渡されたidと一致しているtodoデータ
     */
    @GetMapping("/todo/{id}")
    // @GetMapping("/{id}")
    public TodoForm getTodoById(@PathVariable("id") Integer id) {
        TodoForm todof = todoServiceImp.getTodoById(id);
        return todof;
    }

    /*
     * PUT
     * 
     * @param 編集後のtodoデータ
     * 
     * @return
     * todoを上書き（編集）するメソッド
     */
    @PutMapping("/todo/edit/{id}")
    // @PutMapping("/{id}")
    public ResponseEntity<TodoEntity> editTodo(@PathVariable("id") Integer id, @RequestBody @Validated TodoForm todoF,
            BindingResult result) {
        if (result.hasErrors()) {
            // error処理
        }
        return todoServiceImp.updateTodo(id, todoF);
    }

    /*
     * DELETE
     * todoを削除するメソッド
     * 
     * @param 削除したいtodoのid
     * 
     * @return 結果をbooleanで
     */
    @DeleteMapping("/todo/delete/{id}")
    // @DeleteMapping("/{id}")
    public boolean deleteTodo(@PathVariable("id") Integer id) {
        todoServiceImp.deleteTodo(id);
        return true;
    }

    /*
     * PUT
     * todoの完了/未完了を切り替えるメソッド
     * 
     * @param チェックを切り替えたいtodoのid
     * 
     * @return 結果をbooleanで
     */
    @PutMapping("/todo/toggle/isdone/{id}")
    // @PutMapping("/{id}")
    public String isDone(@PathVariable("id") Integer id) {
        todoServiceImp.toggleIsDone(id);
        return "true";
    }

    /*
     * DELETE
     * todoを全て削除するメソッド
     * 
     * @return 結果をbooleanで
     */
    @DeleteMapping("/todo/alldelete")
    // @DeleteMapping
    public boolean allDeleteTodo() {
        todoServiceImp.allDeleteTodo();
        return true;
    }
}
