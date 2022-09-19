import { useDeleteTodo } from "../../service/Delete/useDeleteTodo";
import { useFetchHtmlElement } from "../../service/HtmlElement/useFetchHtmlElement";
import React, { useCallback } from "react";

export const useDeleteTodoMethod = () => {
  // console.log("useDeleteTodoMethod");

  const fetchMapId = useFetchHtmlElement();
  const deleteTodo = useDeleteTodo();
  const deleteTodoMethod = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      // ① mapのidを受け取る
      const id = fetchMapId(e);
      // ② 取得したidを渡す
      await deleteTodo(id);
    },
    [deleteTodo, fetchMapId]
  );
  return deleteTodoMethod;
};
