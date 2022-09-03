import axios from "axios";
import { useGetTodoList } from "../GET/useGetTodoList";

export const useDeleteTodo = () => {
  // useHook
  const isFetchDBTrue = useGetTodoList();
  const deleteTodo = async (id: string) => {
    const response = await axios.delete(
      `http://localhost:8080/api/delete/${id}`
    );
    if (response.status === 200) {
      console.log("登録成功");
      //  正常にDBにデータを格納したのでDB再取得フラグをtrueに設定
      // setIsGetDb(true);
      isFetchDBTrue();
    }
  };

  return deleteTodo;
};
