import { TodoBackendValueType, TodoFormValueType } from "../../types/todo";
import { useFormatDate } from "./useFormatDate";
import { useCallback } from "react";

export const useConvert = () => {
  // console.log("useConvert");
  const { dateToStr } = useFormatDate();
  const convertFormFEToBE = useCallback(
    (formTodo: TodoFormValueType) => {
      return {
        id: formTodo.id,
        productionDate: dateToStr(formTodo.productionDate),
        finalDeadline: dateToStr(formTodo.finalDeadline),
        todo: formTodo.todo,
        isDone: String(formTodo.isDone),
        priority: String(formTodo.priority),
      };
    },
    [dateToStr]
  );

  const convertBEtoFE = useCallback(
    (beTodoLists: TodoBackendValueType[]): TodoFormValueType[] => {
      if (beTodoLists === undefined) {
        return [];
      }
      if (beTodoLists.length === 0) {
        return [];
      }

      const feTodoList = beTodoLists.map((beTodo) => {
        // setValuesの中で三項演算子を使いたく無いので
        let feIsDone: boolean;
        if (beTodo.isDone.toString() === "true") {
          feIsDone = true;
        } else {
          feIsDone = false;
        }
        return {
          id: beTodo.id,
          productionDate: new Date(beTodo.productionDate),
          finalDeadline: new Date(beTodo.finalDeadline),
          todo: beTodo.todo,
          isDone: feIsDone,
          priority: Number(beTodo.priority),
        };
      });
      return feTodoList;
    },
    []
  );

  return { convertFormFEToBE, convertBEtoFE };
};
