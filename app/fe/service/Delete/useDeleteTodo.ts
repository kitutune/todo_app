import axios from "axios";
import { useCallback } from "react";
import { useErrorHandle } from "service/errorHandle/useErrorHandle";

export const useDeleteTodo = () => {
  // console.log("useDeleteTodo");
  const axiosError = useErrorHandle();
  const deleteTodo = useCallback(
    async (id: string) => {
      try {
        await axios.delete(`http://localhost:8080/api/delete/${id}`);
      } catch (error: unknown) {
        axiosError(error);
      }
    },
    [axiosError]
  );

  return deleteTodo;
};
