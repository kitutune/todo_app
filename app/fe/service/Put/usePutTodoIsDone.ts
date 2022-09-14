import axios from "axios";
import { useCallback } from "react";

export const usePutTodoIsDone = () => {
  //useHook
  // DBにformから受け取った値を登録（INSERT）するメソッド（PUTなので既に登録されているデータに上書きする）
  const isDoneDbInsert = useCallback(async (id: string) => {

    const response = await axios
      // java側でPUTメソッドを実装しているURL、リクエスト先
      .put(`http://localhost:8080/api/toggle/isdone/${id}`);

    if (response.status === 200) {
      console.log("登録成功");
      //  正常にDBにデータを格納したのでDB再取得フラグをtrueに設定
    }

  }, []);

  return isDoneDbInsert;
};
