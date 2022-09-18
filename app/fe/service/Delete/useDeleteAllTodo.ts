import axios from "axios";
import { useCallback } from "react";
import { useErrorHandle } from "service/ErrorHandle/useErrorHandle";

export const useDeleteAllTodo = () => {
  // console.log("useDeleteAllTodo");
  const axiosError = useErrorHandle();
  const deleteAllTodo = useCallback(async () => {
    try {
      await axios.delete(`http://localhost:8080/api/alldelete`);
    } catch (error: unknown) {
      axiosError(error);
    }
  }, [axiosError]);

  return deleteAllTodo;
};
