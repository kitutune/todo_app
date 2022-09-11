import axios from "axios";
import { useCallback } from "react";

export const useDeleteTodo = () => {
  const deleteTodo = useCallback(async (id: string) => {
    const response = await axios.delete(
      `http://localhost:8080/api/delete/${id}`
    );
    if (response.status === 200) {
      console.log("登録成功");
    }
  },[])

  return deleteTodo;
};
