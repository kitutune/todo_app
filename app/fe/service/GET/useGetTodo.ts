import axios from "axios";
import { useCallback } from "react";
import { useErrorHandle } from "service/errorHandle/useErrorHandle";

export const useGetTodo = () => {
  // console.log("useGetTodo");

  const axiosError = useErrorHandle();
  const getTodoById = useCallback(
    async (id: string) => {
      let response;
      try {
        response = await axios.get(`http://localhost:8080/api/single/${id}`);
      } catch (error: unknown) {
        axiosError(error);
      }
      if (response === undefined) {
        throw new Error("返り値がundefinedです");
      }
      return response;
    },
    [axiosError]
  );
  return getTodoById;
};
