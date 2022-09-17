import { TodoFormValue } from "../../types/todo";

// form形式のtodoをentity形式にコンバート
export const useConvert = () => {
  // console.log("useConvert");

  const convertFormToEntity = (formTodo: TodoFormValue) => {
    return {
      id: Number(formTodo.id),
      productionDate: formTodo.productionDate,
      finalDeadline: formTodo.finalDeadline,
      todo: formTodo.todo,
      isDone: String(formTodo.isDone),
      priority: String(formTodo.priority),
    };
  };

  return convertFormToEntity;
};
