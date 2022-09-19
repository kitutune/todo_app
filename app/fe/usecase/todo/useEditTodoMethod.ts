import { useGetTodo } from "../../service/GET/useGetTodo";
import { useFetchHtmlElement } from "../../service/HtmlElement/useFetchHtmlElement";
import React, { useCallback } from "react";

export const useEditTodoMethod = () => {
  // console.log("useEditTodoMethod");

  const fetchMapId = useFetchHtmlElement();
  const getTodoById = useGetTodo();

  const editTodoMethod = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      // ① mapのidを受け取る
      const id = fetchMapId(e);
      // ② ①で取得したidからユーザーデータを取得する awaitがなければ③がユーザーデーターを取得する前に実行され失敗する
      const response = await getTodoById(id);

      return response.data;
    },
    [fetchMapId, getTodoById]
  );

  return editTodoMethod;
};
