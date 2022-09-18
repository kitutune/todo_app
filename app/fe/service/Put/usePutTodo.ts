import axios from "axios";
import { useCallback } from "react";
import { useErrorHandle } from "service/ErrorHandle/useErrorHandle";
import { TodoFormValueType } from "../../types/todo";

export const usePutTodo = () => {
  // console.log("usePutTodo");
  const axiosError = useErrorHandle();
  const dbEdited = useCallback(
    async (formTodo: TodoFormValueType) => {
      try {
        await axios.put(
          `http://localhost:8080/api/edit/${formTodo.id}`,
          formTodo,
          {
            // デフォルト値がapplication/jsonなので記述必要なし
            // headers: { "Content-Type": "application/json" },
          }
        );
      } catch (error: unknown) {
        axiosError(error);
      }
    },
    [axiosError]
  );

  return dbEdited;
};
