import axios from "axios";
import { useCallback } from "react";
import { TodoFormValue } from "../../types/todo";

export const usePostTodo = () => {
  // console.log("usePostTodo");
  const BASEURL = "http://localhost:8080/api/regist";
  const dbRegistered = useCallback(async (formTodo: TodoFormValue) => {
    const response = await axios.post(BASEURL, formTodo, {
      // デフォルト値がapplication/jsonなので記述必要なし
      // headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      console.log("登録成功");
    }
  }, []);

  return dbRegistered;
};
