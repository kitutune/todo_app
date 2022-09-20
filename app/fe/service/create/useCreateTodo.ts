import { TodoFormValueType } from "../../types/todo";
import axios from "axios";
import { useCallback } from "react";
import { useErrorHandle } from "service/errorHandle/useErrorHandle";

export const useCreateTodo = () => {
  // console.log("usePostTodo");
  const axiosError = useErrorHandle();
  const BASEURL = "http://localhost:8080/api/regist";
  const dbRegistered = useCallback(
    async (formTodo: TodoFormValueType) => {
      try {
        await axios.post(BASEURL, formTodo, {
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
