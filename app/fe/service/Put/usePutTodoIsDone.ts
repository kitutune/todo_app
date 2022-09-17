import axios from "axios";
import { useCallback } from "react";

export const usePutTodoIsDone = () => {
  // console.log("usePutTodoIsDone");
  const isDoneDbInsert = useCallback(async (id: string) => {

    const response = await axios
      .put(`http://localhost:8080/api/toggle/isdone/${id}`);

    if (response.status === 200) {
      console.log("登録成功");
    }

  }, []);

  return isDoneDbInsert;
};
