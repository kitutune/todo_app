import axios from "axios";
import { useCallback } from "react";
// async await
// useHookであるusePutTodo自体には引数は必要ない
export const useGetTodo = () => {
  // Todoテーブルから取得
  const getTodoById = useCallback(async (id: string) => {
    const response = await axios
      // java側でDELETEメソッドを実装しているURL、リクエスト先
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
