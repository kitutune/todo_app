import axios from "axios";
import { useCallback } from "react";
export const useGetTodo = () => {
  // console.log("useGetTodo");

  const getTodoById = useCallback(async (id: string) => {
    const response = await axios
      .get(`http://localhost:8080/api/single/${id}`)
      .catch((error) => {
        // レスポンスありのエラーハンドリング（実際には必要に応じた例外処理を実装する）
        console.log(
          `Error! code: ${error.response.status}, message: ${error.message}`
        );
        return error.response;
      });
    console.log("response.data", response.data);
    return response;
  }, []);

  return getTodoById;
};
