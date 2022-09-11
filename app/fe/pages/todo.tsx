import { Checkbox } from "@mantine/core";
import dayjs from "dayjs";
import { memo, useCallback, useEffect, useState } from "react";
import { TodoForm } from "../components/TodoForm";
import { useDeleteAllTodo } from "../service/Delete/useDeleteAllTodo";
import { useGetTodoList } from "../service/GET/useGetTodoList";
import { TodoFormValue } from "../types/todo";
import { useDeleteMethod } from "../usecase/todo/useDeleteMethod";
import { useEditMethod } from "../usecase/todo/useEditMethod";
import { useIsDoneMethod } from "../usecase/todo/useIsDoneMethod";

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
  console.log("list:", list);
  console.log("editForm:", editForm);

  const getTodoList = useGetTodoList();
  const deleteMethod = useDeleteMethod();
  const isDoneMethod = useIsDoneMethod();
  const editMethod = useEditMethod();

  // useHook
  const deleteAllTodo = useDeleteAllTodo();
  // 編集ボタン
  const fetchEditTodoId = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      setEditForm(await editMethod(e));
    },
    [editMethod]
  );

  const loadTodoList = useCallback(async () => {
    setList(await getTodoList());
    console.log("読み込み");
  }, [getTodoList]);

  // 削除ボタン
  const fetchDeleteTodoId = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      await deleteMethod(e);
      loadTodoList();
    },
    [deleteMethod, loadTodoList]
  );

  // 済みボタン
  const fetchIsDoneTodoId = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      await isDoneMethod(e);
      loadTodoList();
    },
    [isDoneMethod, loadTodoList]
  );

  useEffect(() => {
    loadTodoList();
  }, [loadTodoList]);

  // Recoilから受け取ったtodoデータのリストを表示
  const showTodoList = list.map((todoData, index) => (
    <tr key={index}>
      <td className="border px-4 py-2 " >
        <Checkbox
        className="flex-col"
          checked={todoData.isDone === "true" ? true : false}
          data-id={todoData.id}
          onClick={fetchIsDoneTodoId}
        />
        {/* <input type="checkbox" 
        
          checked={todoData.isDone === "true" ? true : false}
          data-id={todoData.id}
          onClick={fetchIsDoneTodoId}
        /> */}
      </td>
      <td className="border px-4 py-2">{todoData.id}</td>
      <td className="border px-4 py-2">
        {/* ライブラリdayjsを使用してDate型をフォーマット */}
        {dayjs(todoData.productionDate).locale("ja").format("YYYY/MM/DD(dd)")}
      </td>
      <td className="border px-4 py-2">
        {/* ライブラリdayjsを使用してDate型をフォーマット */}
        {dayjs(todoData.finalDeadline).locale("ja").format("YYYY/MM/DD(dd)")}
      </td>
      <td className="border px-4 py-2">{todoData.todo}</td>
      <td
        className="border px-4 py-2"
        // ※カスタムパラメータは"data-"という形式でないと型エラーを吐く
        data-isDone={todoData.isDone}
      >
        {todoData.isDone}
      </td>
      <td className="border px-4 py-2">{todoData.priority}</td>
      <td
        className="border px-4 py-2 cursor-pointer"
        //  ※カスタムパラメータは"data-"という形式でないと型エラーを吐く
        data-id={todoData.id}
        onClick={fetchEditTodoId}
      >
        編集
      </td>
      <td
        className="border px-4 py-2 cursor-pointer"
        data-id={todoData.id}
        onClick={fetchDeleteTodoId}
      >
        削除
      </td>
    </tr>
  ));

  return (
    <div >
      <TodoForm editData={editForm} loadTodoList={loadTodoList} />

      <button onClick={() => deleteAllTodo()}>全てのTodo削除</button>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">済み？</th>
            <th className="px-4 py-2">id</th>
            <th className="px-4 py-2">productionDate</th>
            <th className="px-4 py-2">finalDeadline</th>
            <th className="px-4 py-2">todo</th>
            <th className="px-4 py-2">isDone</th>
            <th className="px-4 py-2">priority</th>
            <th className="px-4 py-2">編集</th>
            <th className="px-4 py-2">削除</th>
          </tr>
        </thead>
        <tbody>{list.length === 0 ? null : showTodoList}</tbody>
      </table>
    </div>
  );
});
export default Todo;
