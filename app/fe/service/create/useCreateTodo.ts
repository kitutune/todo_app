import { TodoBackendValueType } from "../../types/todo";
import axios from "axios";
import { useCallback } from "react";
import { useErrorHandle } from "service/errorHandle/useErrorHandle";

export const useCreateTodo = () => {
  // console.log("usePostTodo");
  const axiosError = useErrorHandle();
  const BASEURL = "http://localhost:8080/api/regist";
  const dbRegistered = useCallback(
    async (formTodo: TodoBackendValueType) => {
      try {
        await axios.post(BASEURL, formTodo, {
          // デフォルト値がapplication/jsonなので記述必要なし
          // headers: { "Content-Type": "application/json" },
        });
      } catch (error: unknown) {
        axiosError(error);
      }
    },
    [axiosError]
  );

  return dbRegistered;
};
