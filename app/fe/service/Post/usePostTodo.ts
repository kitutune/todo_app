import axios from "axios";
import { useCallback } from "react";
import { TodoFormValue } from "../../types/todo";

export const usePostTodo = () => {
  // java側でPOSTメソッドを実装しているURL
  const BASEURL = "http://localhost:8080/api/regist";
  // DBにformから受け取った値を登録（INSERT）するメソッド
  const dbRegistered = useCallback(async (formTodo: TodoFormValue) => {
    const response = await axios.post(BASEURL, formTodo, {
      // デフォルト値がapplication/jsonなので記述必要なし
      // headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      console.log("登録成功");
    }

    console.log(response.status);
    console.log(response.data);
  }, []);

  return dbRegistered;
};
