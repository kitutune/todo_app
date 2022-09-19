import axios from "axios";
import { useCallback } from "react";
import { useErrorHandle } from "service/ErrorHandle/useErrorHandle";

export const usePutTodoIsDone = () => {
  // console.log("usePutTodoIsDone");
  const axiosError = useErrorHandle();
  const isDoneDbInsert = useCallback(
    async (id: string) => {
      try {
        // const response =
        await axios.put(`http://localhost:8080/api/toggle/isdone/${id}`);
      } catch (error: unknown) {
        axiosError(error);
      }
    },
    [axiosError]
  );

  return isDoneDbInsert;
};
