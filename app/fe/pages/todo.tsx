import { ArrayFilter } from "components/lv3/ArrayFilter";
import { ShowTodoList } from "components/lv4/ShowTodoList";
import { memo, useCallback, useEffect, useState } from "react";
import { TodoForm } from "../components/lv4/TodoForm";
import { useDeleteAllTodo } from "../service/Delete/useDeleteAllTodo";
import { useGetTodoList } from "../service/GET/useGetTodoList";
import { TodoFormValue } from "../types/todo";
import { SortButtons } from "components/lv3/SortButtons";

// eslint-disable-next-line react/display-name
const Todo = memo(() => {
  // console.log("Todo");

  const [editForm, setEditForm] = useState<TodoFormValue>({
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
  });
  // BEから取得したTodoListを保管するState
  const [list, setList] = useState<TodoFormValue[]>([]);
  // FEでフィルターやソートを行った後のTodoListを保管するState
  const [result, setResult] = useState<TodoFormValue[]>([]);

  // useHook
  // BEからTodoListを取得するメソッド
  const getTodoList = useGetTodoList();
  // DBから全てのデータを削除するメソッド
  const deleteAllTodo = useDeleteAllTodo();

  const loadTodoList = useCallback(async () => {
    setList(await getTodoList());
  }, [getTodoList]);

  const deleteAll = useCallback(async () => {
    await deleteAllTodo();
    loadTodoList();
  }, [deleteAllTodo, loadTodoList]);

  useEffect(() => {
    loadTodoList();
  }, [loadTodoList]);

  return (
    <div>
      <TodoForm editData={editForm} loadTodoList={loadTodoList} />
      <ArrayFilter setResult={setResult} list={list} />
      <button onClick={deleteAll}>全てのTodo削除</button>
      <table className="table-auto">
        <thead>
          <tr>
            <th>is？</th>
            <SortButtons
              setResult={setResult}
              list={list}
              editForm={editForm}
            />
          </tr>
        </thead>
        {result.length === 0 ? null : (
          <ShowTodoList
            loadTodoList={loadTodoList}
            list={result}
            setEditForm={setEditForm}
          />
        )}
      </table>
    </div>
  );
});
export default Todo;
