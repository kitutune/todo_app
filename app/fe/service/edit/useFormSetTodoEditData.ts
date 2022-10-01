import { useCallback } from "react";
import { TodoFormValueType } from "types/todo";

type formType = {
  setValues: (arg0: TodoFormValueType) => void;
};

export const useFormSetTodoEditData = () => {
  const formSetTodoEditData = useCallback(
    (editData: TodoFormValueType, form: formType) => {
      // setValuesの中で三項演算子を使いたく無いので
      let isDoneValue: boolean;
      if (editData.id === "") {
        console.log("idが空なので編集データではありません");
        return;
      }
      // editDataとしてDBから取得するisDoneはstring型の"true"や"false"なのでここでbooleanに変換する
      if (editData.isDone.toString() === "true") {
        isDoneValue = true;
      } else {
        isDoneValue = false;
      }

      form.setValues({
        id: editData.id,
        productionDate: new Date(editData.productionDate),
        finalDeadline: new Date(editData.finalDeadline),
        todo: editData.todo,
        isDone: isDoneValue,
        priority: Number(editData.priority),
      });
    },
    []
  );

  return formSetTodoEditData;
};
