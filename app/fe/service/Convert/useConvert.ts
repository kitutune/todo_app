import { TodoBeValueType, TodoFormValueType } from "../../types/todo";
import { useCallback } from "react";

export const useConvert = () => {
  // console.log("useConvert");

  const convertFormFEToBE = useCallback((formTodo: TodoFormValueType) => {
    return {
      id: formTodo.id,
      productionDate: formTodo.productionDate,
      finalDeadline: formTodo.finalDeadline,
      todo: formTodo.todo,
      isDone: String(formTodo.isDone),
      priority: String(formTodo.priority),
    };
  }, []);

  const convertBEtoFE = useCallback((beTodoLists: TodoBeValueType[]) => {
    if (beTodoLists === undefined) {
      return beTodoLists;
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
        productionDate: beTodo.productionDate,
        finalDeadline: beTodo.finalDeadline,
        todo: beTodo.todo,
        isDone: feIsDone,
        priority: Number(beTodo.priority),
      };
    });
    return feTodoList;
  }, []);

  return { convertFormFEToBE, convertBEtoFE };
};
