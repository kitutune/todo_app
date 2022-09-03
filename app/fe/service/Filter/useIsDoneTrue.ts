import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoListState } from "../../atom/GET/TodoList";
import { TodoFormValue } from "../../types/todo";

export const useIsDoneTrue = () => {
  // Recoil
  // 状態を取得する側のRecoil:useRecoilValue
  const recoilTodoList = useRecoilValue(todoListState);
  // 状態を入力する側のRecoil:useSetRecoilState
  const setRecoilTodoList = useSetRecoilState(todoListState);
  const isDoneTrue = useCallback(async () => {
    // 作業済みのTodo
    const workedTodo: TodoFormValue[] = recoilTodoList.filter((todoData) => {
      // todoDataに保管されているisDoneはstringなのでstringで真偽する
      return todoData.isDone === "true";
    });
    setRecoilTodoList(workedTodo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isDoneTrue;
};
