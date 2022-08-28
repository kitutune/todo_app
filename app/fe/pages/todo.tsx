import dayjs from "dayjs";
import { useCallback, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoListState } from "../atom/GET/TodoList";
import { editTodoState } from "../atom/PUT/Todo";
import { TodoForm } from "../components/TodoForm";
import { useDeleteTodo } from "../service/Delete/useDeleteTodo";
import { useGetTodo } from "../service/GET/useGetTodo";
import { useGetTodoList } from "../service/GET/useGetTodoList";

const Todo = () => {
  // Recoil
  const recoilTodoList = useRecoilValue(todoListState);
  console.log("受け取ったリスト", recoilTodoList);
  // 状態を入力する側のRecoil
  const setRecoilEditTodo = useSetRecoilState(editTodoState);

  // useHook
  const getTodoList = useGetTodoList();
  const deleteTodo = useDeleteTodo();
  const getTodoById = useGetTodo();

  // 編集ボタン
  const fetchEditTodoId = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      // ①押した変種ボタンからdata-idに格納されているidを取得
      const id = e.currentTarget.getAttribute("data-id");
      if (!id) {
        return;
      }
      // ② ①で取得したidからユーザーデータを取得する awaitがなければ③がユーザーデーターを取得する前に実行され失敗する
      const response = await getTodoById(id);
      // ③ ②で取得したデータがちゃんと取れてきているかステータスが200になっているかで確認する(コンソールで見ると中に何が入っているかわかる)
      console.log("responseの中身:", response);
      if (response.status == 200) {
        // ④ 成功していたらRecoilのeditTodoStateに返ってきたレスポンスのデータを格納する
        setRecoilEditTodo(response.data);
      } else {
        // ⑤失敗時の処理
        console.log(
          `データの取得に失敗しました：response.statusは${response.status}です`
        );
      }
    },
    []
  );

  // 削除ボタン
  const fetchDeleteTodoId = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.getAttribute("data-id");
    // nullの可能性を排除
    if (!id) {
      return;
    }
    // 取得したidを渡す
    deleteTodo(id);
  }, []);

  // コンポーネントが読み込まれた際に一度だけ実行する
  useEffect(() => {
    getTodoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recoilから受け取ったtodoデータのリストを表示
  const showTodoList = recoilTodoList.map((todoData) => (
    <tr key={todoData.id}>
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
      {/* ※カスタムパラメータは"data-"という形式でないと型エラーを吐く */}
      <td className="border px-4 py-2" data-isDone={todoData.isDone}>
        {todoData.isDone}
      </td>
      <td className="border px-4 py-2">{todoData.priority}</td>
      {/* ※カスタムパラメータは"data-"という形式でないと型エラーを吐く */}
      <td
        className="border px-4 py-2"
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
      <table className="table-auto">
        <thead>
          <tr>
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
          {!(recoilTodoList[0].id === "") ? showTodoList : null}
        </tbody>
      </table>
    </div>
  );
};
export default Todo;
