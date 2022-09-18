import axios from "axios";
import { useCallback } from "react";
import { useErrorHandle } from "service/ErrorHandle/useErrorHandle";
import { TodoFormValueType } from "../../types/todo";

export const usePostTodo = () => {
  // console.log("usePostTodo");
  const axiosError = useErrorHandle();
  const BASEURL = "http://localhost:8080/api/regist";
  const dbRegistered = useCallback(
    async (formTodo: TodoFormValueType) => {
      try {
        const response = await axios.post(BASEURL, formTodo, {
          // デフォルト値がapplication/jsonなので記述必要なし
          // headers: { "Content-Type": "application/json" },
        });
      } catch (error: unknown) {
        axiosError(error);
      }

      // if (response.status === 200) {
      //   console.log("登録成功");
      // }
    },
    [axiosError]
  );

  return dbRegistered;
};
