import { ArrayFilter } from "components/lv3/ArrayFilter";
import { ShowTodoList } from "components/lv4/ShowTodoList";
import { memo, useCallback, useEffect, useState } from "react";
import { TodoForm } from "../components/lv4/TodoForm";
import { useDeleteAllTodo } from "../service/Delete/useDeleteAllTodo";
import { useGetTodoList } from "../service/GET/useGetTodoList";
import { TodoFormValueType } from "../types/todo";
import { SortButtons } from "components/lv3/SortButtons";
import { useTodoForm } from "service/Form/useTodoForm";
import { useDeleteTodoMethod } from "usecase/todo/useDeleteTodoMethod";
import { useEditTodoMethod } from "usecase/todo/useEditTodoMethod";
import { useIsDoneMethod } from "usecase/todo/useIsDoneMethod";
import { useRegistFormSelectSectionDB } from "usecase/todo/useRegistFormSelectSectionDB";

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
  // BEからTodoListを取得するメソッド
  const getTodoList = useGetTodoList();
  // DBから全てのデータを削除するメソッド
  const deleteAllTodo = useDeleteAllTodo();

  const loadTodoList = useCallback(async () => {
    setList(await getTodoList());
  }, [getTodoList]);

  const handleClickKillAllTodoButton = useCallback(async () => {
    await deleteAllTodo();
    loadTodoList();
  }, [deleteAllTodo, loadTodoList]);

  const deleteTodoMethod = useDeleteTodoMethod();
  const isDoneMethod = useIsDoneMethod();
  const editTodoMethod = useEditTodoMethod();

  const formSetTodoEditData = useCallback(
    (editData: TodoFormValueType) => {
      if (editData.id === "") {
        console.log("idが空なので編集データではありません");
        return;
      }
      form.setValues({
        id: editData.id,
        productionDate: editData.productionDate,
        finalDeadline: editData.finalDeadline,
        todo: editData.todo,
        isDone: editData.isDone == "true" ? true : false,
        priority: Number(editData.priority),
      });
    },
    [form]
  );

  // 編集ボタン
  const handleClickEditButton = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      formSetTodoEditData(await editTodoMethod(e));
    },
    [editTodoMethod, formSetTodoEditData]
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
      await isDoneMethod(e);
      loadTodoList();
    },
    [isDoneMethod, loadTodoList]
  );

  const registFormSelectSectionDB = useRegistFormSelectSectionDB();

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
      <ArrayFilter setResult={setResult} list={list} />
      <button onClick={handleClickKillAllTodoButton}>全てのTodo削除</button>
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
        {result.length === 0 ? null : (
          <ShowTodoList
            loadTodoList={loadTodoList}
            list={result}
            setEditFormData={setEditFormData}
            handleClickEditButton={handleClickEditButton}
            handleClickDeleteButton={handleClickDeleteButton}
            handleClickIsDoneCheckBox={handleClickIsDoneCheckBox}
          />
        )}
      </table>
    </div>
  );
});
export default Todo;
