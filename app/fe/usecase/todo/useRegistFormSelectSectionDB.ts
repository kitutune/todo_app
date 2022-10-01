import { TodoFormValueType } from "../../types/todo";
import { useCallback } from "react";
import { useConvert } from "service/convert/useConvert";
import { useCreateTodo } from "service/create/useCreateTodo";
import { useEditTodo } from "service/edit/useEditTodo";

export const useRegistFormSelectSectionDB = () => {
  // console.log("useRegistFormSelectSectionDB");
  const dbEdited = useEditTodo();
  const dbRegistered = useCreateTodo();
  const {convertFormFEToBE }= useConvert();
  // 引数の内容によって登録・編集・リターンを選択する
  const registFormSelectSectionDB = useCallback(
    async (formTodo: TodoFormValueType) => {
      // ①必須項目が空文字なら処理せず返す
      if (formTodo.todo === "") {
        return console.log("空の値は登録できません");
      }
      // ②form形式のtodoをentity形式にコンバート
      const dbTodo = convertFormFEToBE(formTodo);

      // ③編集データを補完するrecoilEditTodoにデータが存在するなら編集データとして処理する
      if (!(formTodo.id == "")) {
        console.log("編集する");
        await dbEdited(dbTodo);
      } else {
        // ④上記条件以外なら新規登録として扱う
        console.log("新規登録します");
        await dbRegistered(dbTodo);
      }
    },
    [convertFormFEToBE, dbEdited, dbRegistered]
  );

  return registFormSelectSectionDB;
};
