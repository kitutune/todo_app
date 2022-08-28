import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { todoListState } from "../atom/GET/TodoList";
import { useGetUserList } from "../service/GET/useGetTodoList";

const Todo = () => {
  // Recoil
  const recoilTodoList = useRecoilValue(todoListState);
  console.log("受け取ったリスト", recoilTodoList);

  // useHook
  const getTodoList = useGetUserList();

  // コンポーネントが読み込まれた際に一度だけ実行する
  useEffect(() => {
    getTodoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recoilから受け取ったtodoデータのリストを表示
  const showTodoList = recoilTodoList.map((todoData) => (
    <tr key={todoData.id}>
      {/* ※カスタムパラメータは"data-"という形式でないと型エラーを吐く */}
      <td className="border px-4 py-2" data-id={todoData.id}>
        {todoData.id}
      </td>
      <td className="border px-4 py-2">{todoData.productionDate}</td>
      <td className="border px-4 py-2">{todoData.finalDeadline}</td>
      <td className="border px-4 py-2">{todoData.todo}</td>
      {/* ※カスタムパラメータは"data-"という形式でないと型エラーを吐く */}
      <td className="border px-4 py-2" data-isDone={todoData.isDone}>
        {todoData.isDone}
      </td>
      <td className="border px-4 py-2">{todoData.priority}</td>
    </tr>
  ));

  return (
    <div>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">id</th>
            <th className="px-4 py-2">productionDate</th>
            <th className="px-4 py-2">finalDeadline</th>
            <th className="px-4 py-2">todo</th>
            <th className="px-4 py-2">isDone</th>
            <th className="px-4 py-2">priority</th>
          </tr>
        </thead>
        <tbody>
          {/* recoilTodoListの最初に登録されているtodoのidが空文字でなければtodolistを表示する */}
          {!(recoilTodoList[0].id === "") ? showTodoList : null}
        </tbody>
      </table>
    </div>
  );
};
export default Todo;
