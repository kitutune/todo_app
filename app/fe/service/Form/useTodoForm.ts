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
      isDone: false,
      // 重要度
      priority: 1,
    },

    validate: {
      // productionDate: (productionDate_value) =>
      //   productionDate_value.length < 1 ? "名前は必須入力です" : null,
      finalDeadline: (finalDeadline_value, formValue) =>
        // console.log(formValue.finalDeadline, ">=", formValue.productionDate);
        // console.log(
        //   formValue.finalDeadline.getFullYear() +
        //     "/" +
        //     (formValue.finalDeadline.getMonth() + 1) +
        //     "/" +
        //     formValue.finalDeadline.getDay(),
        //   ">=",
        //   formValue.productionDate.getFullYear() +
        //     "/" +
        //     (formValue.productionDate.getMonth() + 1) +
        //     "/" +
        //     formValue.productionDate.getDay()
        // );
        // console.log(
        //   formValue.finalDeadline.getMonth(),
        //   ">=",
        //   formValue.productionDate.getMonth()
        // );
        // console.log(
        //   formValue.finalDeadline.getDay(),
        //   ">=",
        //   formValue.productionDate.getDay()
        // );

        formValue.finalDeadline.getFullYear() +
          "/" +
          (formValue.finalDeadline.getMonth() + 1) +
          "/" +
          formValue.finalDeadline.getDay() <
        formValue.productionDate.getFullYear() +
          "/" +
          (formValue.productionDate.getMonth() + 1) +
          "/" +
          formValue.productionDate.getDay()
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
