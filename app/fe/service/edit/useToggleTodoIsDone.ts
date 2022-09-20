import axios from "axios";
import { useCallback } from "react";
import { useErrorHandle } from "service/ErrorHandle/useErrorHandle";

export const useToggleTodoIsDone = () => {
  // console.log("usePutTodoIsDone");
  const axiosError = useErrorHandle();
  const isDoneToggleDb = useCallback(
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

  return isDoneToggleDb;
};
