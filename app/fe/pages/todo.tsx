import { TodoForm } from "../components/lv4/TodoForm";
import { TodoFormValueType } from "../types/todo";
import { ArrayFilter } from "components/lv3/ArrayFilter";
import { SortButtons } from "components/lv3/SortButtons";
import { ShowTodoList } from "components/lv4/ShowTodoList";
import { memo, useCallback, useEffect, useState } from "react";
import React from "react";
import { useConvert } from "service/convert/useConvert";
import { useDeleteAllTodo } from "service/delete/useDeleteAllTodo";
import { useTodoForm } from "service/form/useTodoForm";
import { useGetTodoList } from "service/get/useGetTodoList";
import { useDeleteTodoMethod } from "usecase/todo/useDeleteTodoMethod";
import { useEditTodoMethod } from "usecase/todo/useEditTodoMethod";
import { useRegistFormSelectSectionDB } from "usecase/todo/useRegistFormSelectSectionDB";
import { useToggleIsDoneMethod } from "usecase/todo/useToggleIsDoneMethod";

export const TodoFormValue = {
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
};

// eslint-disable-next-line react/display-name
const Todo = memo(() => {
  console.log("Todo");

  const [editFormData, setEditFormData] =
    useState<TodoFormValueType>(TodoFormValue);
  // BEから取得したTodoListを保管するState
  const [list, setList] = useState<TodoFormValueType[]>([]);
  // FEでフィルターやソートを行った後のTodoListを保管するState
  const [result, setResult] = useState<TodoFormValueType[]>([]);
  const form = useTodoForm();
  // useHook
  const getTodoList = useGetTodoList();
  const deleteAllTodo = useDeleteAllTodo();
  const deleteTodoMethod = useDeleteTodoMethod();
  const toggleIsDoneMethod = useToggleIsDoneMethod();
  const editTodoMethod = useEditTodoMethod();
  const registFormSelectSectionDB = useRegistFormSelectSectionDB();
  const { convertBEtoFE } = useConvert();

  const loadTodoList = useCallback(async () => {
    // any型でDBから取得
    const beTodoList = await getTodoList();
    // FE側で利用できるように型にはめる
    const feTodoList = convertBEtoFE(beTodoList);

    setList(feTodoList);
  }, [convertBEtoFE, getTodoList]);

  const handleClickKillAllTodoButton = useCallback(async () => {
    await deleteAllTodo();
    loadTodoList();
  }, [deleteAllTodo, loadTodoList]);

  // 編集ボタン
  const handleClickEditButton = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      editTodoMethod(e, form);
    },
    [editTodoMethod, form]
  );

  // 削除ボタン
  const handleClickDeleteButton = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      await deleteTodoMethod(e);
      loadTodoList();
    },
    [deleteTodoMethod, loadTodoList]
  );

  // 済みボタン
  const handleClickIsDoneCheckBox = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      await toggleIsDoneMethod(e);
      loadTodoList();
    },
    [toggleIsDoneMethod, loadTodoList]
  );

  // 登録と編集
  const handleClickSendDbButton = form.onSubmit(
    useCallback(
      async (values: TodoFormValueType) => {
        await registFormSelectSectionDB(values);
        loadTodoList();
        form.reset();
      },
      [form, loadTodoList, registFormSelectSectionDB]
    )
  );

  useEffect(() => {
    loadTodoList();
  }, [loadTodoList]);

  return (
    <div>
      <TodoForm
        form={form}
        editData={editFormData}
        loadTodoList={loadTodoList}
        handleClickSendDbButton={handleClickSendDbButton}
      />
      {/* ShowTodoListで表示するresultを返す */}
      <ArrayFilter setResult={setResult} list={list} />
      <button onClick={handleClickKillAllTodoButton}>全てのTodo削除</button>
      {result.length === 0 ? (
        <div>
        表示できるTodoデータがありません
        </div>
      ) : (
        <table className="table-auto">
          <thead>
            <tr>
              <th>is？</th>
              <SortButtons
                setResult={setResult}
                list={list}
                editFormData={editFormData}
              />
            </tr>
          </thead>
          <ShowTodoList
            loadTodoList={loadTodoList}
            list={result}
            setEditFormData={setEditFormData}
            handleClickEditButton={handleClickEditButton}
            handleClickDeleteButton={handleClickDeleteButton}
            handleClickIsDoneCheckBox={handleClickIsDoneCheckBox}
          />
        </table>
      )}
    </div>
  );
});
export default Todo;
