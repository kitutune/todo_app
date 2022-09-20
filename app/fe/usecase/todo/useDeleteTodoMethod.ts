import React, { useCallback } from "react";
import { useDeleteTodo } from "service/delete/useDeleteTodo";
import { useFetchHtmlElement } from "service/htmlElement/useFetchHtmlElement";

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
