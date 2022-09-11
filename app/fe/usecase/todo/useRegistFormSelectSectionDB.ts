import React, { useCallback } from "react";
import { useConvert } from "../../service/Convert/useConvert";
import { usePostTodo } from "../../service/Post/usePostTodo";
import { usePutTodo } from "../../service/Put/usePutTodo";
import { TodoFormValue } from "../../types/todo";

export const useRegistFormSelectSectionDB = () => {
  const dbEdited = usePutTodo();
  const dbRegistered = usePostTodo();
  const convertFormToEntity = useConvert();
  const registFormSelectSectionDB = useCallback(async(formTodo: TodoFormValue) => {
    // ①必須項目が空文字なら処理せず返す
    if (formTodo.todo === "") {
      return console.log("空の値は登録できません");
    }
    // ②form形式のtodoをentity形式にコンバート
    const dbTodo = convertFormToEntity(formTodo);

    // ③編集データを補完するrecoilEditTodoにデータが存在するなら編集データとして処理する
    if ( !(formTodo.id == "")) {
      console.log("編集します");
      console.log("編集後の内容", formTodo);
     await dbEdited(dbTodo);
    } else {
      // ④上記条件以外なら新規登録として扱う
      console.log("新規登録します");
     await dbRegistered(dbTodo);
    }
  },[convertFormToEntity, dbEdited, dbRegistered])

  return registFormSelectSectionDB;
};
