import axios from "axios";
import { useCallback } from "react";
import { TodoFormValue } from "../../types/todo";

export const usePutTodo = () => {
  // console.log("usePutTodo");
  const dbEdited = useCallback(async(formTodo: TodoFormValue) => {

  const response = await  axios
      .put(`http://localhost:8080/api/edit/${formTodo.id}`, formTodo, {
        // デフォルト値がapplication/jsonなので記述必要なし
        // headers: { "Content-Type": "application/json" },
      })
      if (response.status === 200) {
        console.log("登録成功");
      }
  }, []);

  return dbEdited;
};
