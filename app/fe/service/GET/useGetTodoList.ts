import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
export const useGetTodoList = () => {
  // console.log("useGetTodoList");
  const BASEURL = "http://localhost:8080/api/all";
  // Todoテーブルから取得
  const getTodoList = useCallback(async () => {
    const response: AxiosResponse = await axios.get(BASEURL).catch((error) => {
      // レスポンスありのエラーハンドリング（実際には必要に応じた例外処理を実装する）
      console.log(
        `Error! code: ${error.response.status}, message: ${error.message}`
      );
      // 回収していないがAxiosResponseの型用に配置
      return error.response;
    });
    console.log(response.data);
    // 回収していないがAxiosResponseの型用に配置
    return response.data;
  }, []);
  return getTodoList;
};
