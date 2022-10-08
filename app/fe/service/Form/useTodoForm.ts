import { useForm } from "@mantine/form";
import { TodoFormValue } from "pages/todo";
import { useFormatDate } from "service/convert/useFormatDate";

export const useTodoForm = () => {
  // console.log("useTodoForm");

  // useHook
  const { formatDateTypeToDate } = useFormatDate();
  const form = useForm({
    initialValues: TodoFormValue,
    validate: {
      finalDeadline: (finalDeadline_value, formValue) =>
        // 日付までを抜き出して比較
        formatDateTypeToDate(formValue.finalDeadline) <
        formatDateTypeToDate(formValue.productionDate)
          ? "作成日より前の日付は選択できません"
          : null,
      todo: (todo_value) =>
        0 == todo_value.length
          ? "todoは必須入力です"
          : todo_value.length > 50
          ? "todoは50文字以内で入力してください"
          : null,
    },
  });

  return form;
};
