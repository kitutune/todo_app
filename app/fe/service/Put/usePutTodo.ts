import axios from "axios";
import { useCallback } from "react";
import { TodoFormValue } from "../../types/todo";
import { useGetTodoList } from "../GET/useGetTodoList";

// useHookであるusePutTodo自体には引数は必要ない
export const usePutTodo = () => {
  //useHook
  const isFetchDBTrue = useGetTodoList();
  // DBにformから受け取った値を登録（INSERT）するメソッド（PUTなので既に登録されているデータに上書きする）
  // dbEditedには引数が必要
  const dbEdited = useCallback((formTodo: TodoFormValue) => {
    console.log("formTodo", formTodo);

    axios
      // java側でPUTメソッドを実装しているURL、リクエスト先
      .put(`http://localhost:8080/api/edit/${formTodo.id}`, formTodo, {
        // デフォルト値がapplication/jsonなので記述必要なし
        // headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("登録成功");
          //  正常にDBにデータを格納したのでDB再取得フラグをtrueに設定
          isFetchDBTrue();
        }

        console.log(response.status);
        console.log(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return dbEdited;
};
