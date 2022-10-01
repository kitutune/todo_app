import { useForm } from "@mantine/form";
import { TodoFormValue } from "pages/todo";
import { useFormatDate } from "service/convert/useFormatDate";

export const useTodoForm = () => {
  // console.log("useTodoForm");

  // useHook
  const formatDateTypeToDate = useFormatDate();
  const form = useForm({
    initialValues: TodoFormValue,
    validate: {
      // productionDate: (productionDate_value) =>
      //   productionDate_value.length < 1 ? "名前は必須入力です" : null,
      finalDeadline: (finalDeadline_value, formValue) =>
        // 日付までを抜き出して比較
        formatDateTypeToDate(formValue.finalDeadline) <
        formatDateTypeToDate(formValue.productionDate)
          ? "作成日より前の日付は選択できません"
          : null,
      todo: (todo_value) =>
        todo_value.length < 1 ? "todoは必須入力です" : null,
      // isDone: (isDone_value) =>
      //   isDone_value.length < 1 ? "todoは必須入力です" : null,
      // priority: (priority_value) =>
      //   priority_value.length < 1 ? "todoは必須入力です" : null,
      // email: (mail_value) =>
      //   mail_value.length === 0
      //     ? null
      //     : /^\S+@\S+$/.test(mail_value)
      //     ? null
      //     : "メールアドレス形式で入力してください",
    },
  });

  return form;
};
