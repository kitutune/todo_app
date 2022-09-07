import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "../../atom/GET/TodoList";
export const useGetTodoList = () => {
  // DB取得を実行するか否かのフラグ
  const [isFetchDB, setIsFetchDB] = useState(false);
  // java側でGETメソッドを実装しているURL、リクエスト先
  const BASEURL = "http://localhost:8080/api/all";
  // Recoil
  // 状態を入力する側のRecoil:useSetRecoilState
  const setRecoilTodoList = useSetRecoilState(todoListState);
  // Todoテーブルから取得
  const getTodoList = useCallback(async () => {
    const response: AxiosResponse = await axios.get(BASEURL).catch((error) => {
      // レスポンスありのエラーハンドリング（実際には必要に応じた例外処理を実装する）
      console.log(
        `Error! code: ${error.response.status}, message: ${error.message}`
      );
      // 回収していないがAxiosResponseの型用に配置
      return error.response;
    });
    console.log(response.data);
    // Recoilに保管する
    setRecoilTodoList(response.data);
    // 回収していないがAxiosResponseの型用に配置
    return response.data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // getTodoListを実行させるためのフラグをON(true)にする
  const isFetchDBTrue = () => {
    setIsFetchDB(true);
  };

  useEffect(() => {
    // フラグを用意する
    if (isFetchDB) {
      console.log("DBからデータを取得します");

      getTodoList();
      // 再度getTodoListを読み込まないようにfalseに設定
      setIsFetchDB(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchDB]);

  return isFetchDBTrue;
};
