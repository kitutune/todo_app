package com.smd.api.service;

import java.util.Date;
import java.util.List;

import org.springframework.http.ResponseEntity;

import com.smd.api.entity.TodoEntity;
import com.smd.api.form.TodoForm;

// FormとEntity間のコンバートを担当するメソッド名を用意する
public interface TodoService {

    // GET
    // 全てのTodoデータを取得するメソッド
    // (DBから取得なのでEntityだがフロントにSQLのデータを表示したくないのでFormに変換する)
    List<TodoForm> getAllTodo();

    // POST
    // FormをEntityにコンバートしてからJpaでDBに保存する
    ResponseEntity<TodoEntity> saveTodo(TodoForm todoF);

    // GET
    // Todoを編集する場合に使用するメソッド
    // 引数でフロントからidを受け取り一致するTodoデータをDBからTodoEntityとして取得し
    // Formにコンバートしてから返す
    // 命名としてJava側の機能は引数と一致するデータを取得し返す機能なのでEditよりGetかと判断
    TodoForm getTodoById(Integer id);

    // PUT
    // 既にidが存在するtodoデータは全て登録済みのものなのでPUTで編集する形になる
    // 受け取ったidとボディデータ（Todoのデータ）を既存の同じidのTodoデータに上書きするメソッド
    ResponseEntity<TodoEntity> updateTodo(Integer id, TodoForm todoF);

    // DELETE
    // 引数でフロントからidを受け取り一致するTodoデータをDBから削除するメソッド
    // 返り値は削除に成功したか失敗したかを返すのでboolean
    boolean deleteTodo(Integer id);

    // DELETE
    // 全てのtodoデータを削除する
    boolean allDeleteTodo();

    // PUT
    // isDoneのbooleanを書き換える
    String toggleIsDone(Integer id);

    Date dateFormatToDate(String input);

    String dateFormatToString(Date input);

}
