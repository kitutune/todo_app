import { useCallback } from "react";
import { TodoFormValueType } from "types/todo";

type formType = {
  setValues: (arg0: TodoFormValueType) => void;
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
        productionDate: new Date(editData.productionDate),
        finalDeadline: new Date(editData.finalDeadline),
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
