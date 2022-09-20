import { useFetchHtmlElement } from "../../service/htmlElement/useFetchHtmlElement";
import React, { useCallback } from "react";
import { useToggleTodoIsDone } from "service/edit/useToggleTodoIsDone";

export const useToggleIsDoneMethod = () => {
  // console.log("useIsDoneMethod");

  const fetchMapId = useFetchHtmlElement();
  const isDoneToggleDb = useToggleTodoIsDone();

  const toggleIsDoneMethod = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      // ① mapのidを受け取る
      const id = fetchMapId(e);
      // ② 取得したidを渡す
      await isDoneToggleDb(id);
    },
    [fetchMapId, isDoneToggleDb]
  );

  return toggleIsDoneMethod;
};
