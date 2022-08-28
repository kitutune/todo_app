import { useForm } from "@mantine/form";

export const useTodoForm = () => {
  const form = useForm({
    initialValues: {
      // ユニーク
      id: "",
      // todoの作成日（編集時に更新するかはまだ未定）
      productionDate: new Date(),
      // todoの最終期限
      finalDeadline: new Date(),
      // やること
      todo: "",
      // 作業済み
      isDone: "",
      // 重要度
      priority: "",
    },

    validate: {
      // productionDate: (productionDate_value) =>
      //   productionDate_value.length < 1 ? "名前は必須入力です" : null,
      // finalDeadline: (finalDeadline_value) =>
      //   finalDeadline_value.length == 0
      //     ? null
      //     : /(^\d?\d{1}$)|(^1[0-4]{1}\d{1}$)|(^150$)/.test(age_value)
      //     ? null
      //     : "年齢は数字で150以下で入力してください",
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
