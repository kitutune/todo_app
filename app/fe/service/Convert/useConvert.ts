import { TodoFormValue } from "../../types/todo";

// form形式のtodoをentity形式にコンバート
// 特にisDoneはbooleanとStringなので必須
export const useConvert = () => {
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
