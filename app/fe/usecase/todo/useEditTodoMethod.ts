import { UseFormReturnType } from "@mantine/form";
import React, { useCallback } from "react";
import { useFormSetTodoEditData } from "service/edit/useFormSetTodoEditData";
import { useGetTodo } from "service/get/useGetTodo";
import { useFetchHtmlElement } from "service/htmlElement/useFetchHtmlElement";

type formType = UseFormReturnType<{
  id: string;
  productionDate: Date;
  finalDeadline: Date;
  todo: string;
  isDone: boolean;
  priority: number;
}>;

export const useEditTodoMethod = () => {
  // console.log("useEditTodoMethod");

  const fetchMapId = useFetchHtmlElement();
  const getTodoById = useGetTodo();
  const formSetTodoEditData = useFormSetTodoEditData();

  const editTodoMethod = useCallback(
    async (e: React.MouseEvent<HTMLElement>, form: formType) => {
      // ① mapのidを受け取る
      const id = fetchMapId(e);
      // ② ①で取得したidからユーザーデータを取得する awaitがなければ③がユーザーデーターを取得する前に実行され失敗する
      const response = await getTodoById(id);
      formSetTodoEditData(response.data, form);
      // return response.data;
    },
    [fetchMapId, formSetTodoEditData, getTodoById]
  );

  return editTodoMethod;
};
