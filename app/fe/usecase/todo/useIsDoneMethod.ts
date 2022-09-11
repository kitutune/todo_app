import React from "react";
import { useGetTodoList } from "../../service/GET/useGetTodoList";
import { useFetchHtmlElement } from "../../service/HtmlElement/useFetchHtmlElement";
import { usePutTodoIsDone } from "../../service/Put/usePutTodoIsDone";

export const useIsDoneMethod = () => {
  const fetchMapId = useFetchHtmlElement();
  const getTodoList = useGetTodoList();
  const isDoneDbInsert = usePutTodoIsDone();

  const isDoneMethod = async (e: React.MouseEvent<HTMLElement>) => {
    // ① mapのidを受け取る
    const id = fetchMapId(e);
    // ② 取得したidを渡す
    await isDoneDbInsert(id);
  };

  return isDoneMethod;
};