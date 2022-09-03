import { Checkbox } from "@mantine/core";
import dayjs from "dayjs";
import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoListState } from "../atom/GET/TodoList";
import { editTodoState } from "../atom/PUT/Todo";
import { TodoForm } from "../components/TodoForm";
import { useDeleteAllTodo } from "../service/Delete/useDeleteAllTodo";
import { useDeleteTodo } from "../service/Delete/useDeleteTodo";
import { useIsDoneTrue } from "../service/Filter/useIsDoneTrue";
import { useGetTodo } from "../service/GET/useGetTodo";
import { useFetchHtmlElement } from "../service/HtmlElement/useFetchHtmlElement";
import { usePutTodoIsDone } from "../service/Put/usePutTodoIsDone";

const Todo = () => {
  // Recoil
  // 状態を取得する側のRecoil:useRecoilValue
  const recoilTodoList = useRecoilValue(todoListState);
  // 状態を入力する側のRecoil:useSetRecoilState
  const setRecoilEditTodo = useSetRecoilState(editTodoState);

  // useHook
  const fetchMapId = useFetchHtmlElement();
  const toggleIsDone = usePutTodoIsDone();
  const deleteTodo = useDeleteTodo();
  const getTodoById = useGetTodo();
  const deleteAllTodo = useDeleteAllTodo();
  const isDoneTrue = useIsDoneTrue();
  // 編集ボタン
  const fetchEditTodoId = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      // ① mapのidを受け取る
      const id = fetchMapId(e);
      // ② ①で取得したidからユーザーデータを取得する awaitがなければ③がユーザーデーターを取得する前に実行され失敗する
      const response = await getTodoById(id);
      // ③ ②で取得したデータがちゃんと取れてきているかステータスが200になっているかで確認する(コンソールで見ると中に何が入っているかわかる)
      setRecoilEditTodo(response.data);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // 削除ボタン
  const fetchDeleteTodoId = useCallback((e: React.MouseEvent<HTMLElement>) => {
    // ① mapのidを受け取る
    const id = fetchMapId(e);
    // ② 取得したidを渡す
    deleteTodo(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 済みボタン
  const fetchIsDoneTodoId = useCallback((e: React.MouseEvent<HTMLElement>) => {
    // ① mapのidを受け取る
    const id = fetchMapId(e);
    // ② 取得したidを渡す
    toggleIsDone(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recoilから受け取ったtodoデータのリストを表示
  const showTodoList = recoilTodoList.map((todoData) => (
    <tr key={todoData.id}>
      <td>
        <Checkbox
          checked={todoData.isDone === "true" ? true : false}
          data-id={todoData.id}
          onClick={fetchIsDoneTodoId}
        />
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
        className="border px-4 py-2"
        //  ※カスタムパラメータは"data-"という形式でないと型エラーを吐く
        data-id={todoData.id}
        onClick={fetchEditTodoId}
      >
        編集
      </td>
      <td
        className="border px-4 py-2"
        data-id={todoData.id}
        onClick={fetchDeleteTodoId}
      >
        削除
      </td>
    </tr>
  ));

  return (
    <div>
      <TodoForm />

      <button onClick={isDoneTrue}>trueのみ</button>
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
        <tbody>
          {/* recoilTodoListの最初に登録されているtodoのidが空文字でなければtodolistを表示する */}
          {!recoilTodoList ? null : showTodoList}
        </tbody>
      </table>
    </div>
  );
};
export default Todo;
