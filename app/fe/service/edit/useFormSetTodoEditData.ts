import { useCallback } from "react";
import { TodoFormValueType } from "types/todo";

type formType = {
  setValues: (arg0: {
    id: string;
    productionDate: Date;
    finalDeadline: Date;
    todo: string;
    isDone: boolean;
    priority: number;
  }) => void;
};

export const useFormSetTodoEditData = () => {
  const formSetTodoEditData = useCallback(
    (editData: TodoFormValueType, form: formType) => {
      if (editData.id === "") {
        console.log("idが空なので編集データではありません");
        return;
      }
      console.log(editData.finalDeadline);
      console.log(Date().toString());
      

      form.setValues({
        id: editData.id,
        productionDate: editData.productionDate,
        finalDeadline: editData.finalDeadline,
        // finalDeadline: "2022-09-18",
        todo: editData.todo,
        isDone: editData.isDone == "true" ? true : false,
        priority: Number(editData.priority),
      });
    },
    []
  );

  return formSetTodoEditData;
};
