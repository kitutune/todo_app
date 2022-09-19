import { useCallback } from "react";
import { TodoFormValueType } from "../../types/todo";

// form形式のtodoをentity形式にコンバート
export const useConvert = () => {
  // console.log("useConvert");

  const convertFormToEntity =useCallback( (formTodo: TodoFormValueType) => {
    return {
      id: Number(formTodo.id),
      productionDate: formTodo.productionDate,
      finalDeadline: formTodo.finalDeadline,
      todo: formTodo.todo,
      isDone: String(formTodo.isDone),
      priority: String(formTodo.priority),
    };
  },[])

  return convertFormToEntity;
};
