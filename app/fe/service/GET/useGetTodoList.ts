import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { useErrorHandle } from "service/errorHandle/useErrorHandle";

export const useGetTodoList = () => {
  // console.log("useGetTodoList");
  const BASEURL = "http://localhost:8080/api/all";
  const axiosError = useErrorHandle();
  // Todoテーブルから取得
  const getTodoList = useCallback(async () => {
    try {
      const response: AxiosResponse = await axios.get(BASEURL);
      return response.data;
    } catch (error: unknown) {
      axiosError(error);
    }
  }, [axiosError]);

  return getTodoList;
};
