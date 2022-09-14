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
  const [list, setList] = useState<TodoFormValue[]>([]);
  const [result, setResult] = useState<TodoFormValue[]>([]);

  // useHook
  const getTodoList = useGetTodoList();
  const deleteAllTodo = useDeleteAllTodo();

  const loadTodoList = useCallback(async () => {
    setList(await getTodoList());
    console.log("読み込み");
  }, [getTodoList]);

  useEffect(() => {
    loadTodoList();
  }, [loadTodoList]);

  console.log("list:", list);
  console.log("editForm:", editForm);
  console.log("result", result);

  return (
    <div>
      <TodoForm editData={editForm} loadTodoList={loadTodoList} />
      <ArrayFilter setResult={setResult} list={list} />
      <button onClick={() => deleteAllTodo()}>全てのTodo削除</button>
      <table className="table-auto">
        <thead>
          <tr>
            <th >is？</th>
            {/* <th className="px-4 py-2">is？</th>
            <th className="px-4 py-2">id</th>
            <th className="px-4 py-2">productionDate</th>
            <th className="px-4 py-2">finalDeadline</th>
            <th className="px-4 py-2">todo</th>
            <th className="px-4 py-2">isDone</th>
            <th className="px-4 py-2">priority</th>
            <th className="px-4 py-2">編集</th>
            <th className="px-4 py-2">削除</th>  */}
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
