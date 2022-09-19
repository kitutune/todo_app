import { useFetchHtmlElement } from "../../service/HtmlElement/useFetchHtmlElement";
import { usePutTodoIsDone } from "../../service/Put/usePutTodoIsDone";
import React, { useCallback } from "react";

export const useIsDoneMethod = () => {
  // console.log("useIsDoneMethod");

  const fetchMapId = useFetchHtmlElement();
  const isDoneDbInsert = usePutTodoIsDone();

  const isDoneMethod = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      // ① mapのidを受け取る
      const id = fetchMapId(e);
      // ② 取得したidを渡す
      await isDoneDbInsert(id);
    },
    [fetchMapId, isDoneDbInsert]
  );

  return isDoneMethod;
};
