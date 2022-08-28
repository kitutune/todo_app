import { atom } from "recoil";
import { RegistedTodo } from "../../types/todo";
// バケツリレーをしないためにRecoilを採用
// 編集するユーザーのデータを管理する変数を作成する
export const todoState = atom<RegistedTodo>({
  key: "editUserAtom",
  default: {
    // ユニーク
    id: "",
    // todoの作成日（編集時に更新するかはまだ未定）
    productionDate: new Date(),
    // todoの最終期限
    finalDeadline: new Date(),
    // やること
    todo: "",
    // 作業済み
    isDone: "",
    // 重要度
    priority: "",
  },
});
