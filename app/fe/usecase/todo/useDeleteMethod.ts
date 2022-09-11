import React, { useCallback } from "react";
import { useDeleteTodo } from "../../service/Delete/useDeleteTodo";
import { useFetchHtmlElement } from "../../service/HtmlElement/useFetchHtmlElement";

export const useDeleteMethod = () => {
  const fetchMapId = useFetchHtmlElement();
  const deleteTodo = useDeleteTodo();
  const deleteMethod = useCallback(async(e: React.MouseEvent<HTMLElement>) => {
    // ① mapのidを受け取る
    const id = fetchMapId(e);
    // ② 取得したidを渡す
   await deleteTodo(id);
  },[deleteTodo, fetchMapId]);
  return deleteMethod;
};
