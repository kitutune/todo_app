import { atom } from "recoil";
// バケツリレーをしないためにRecoilを採用
// 編集するユーザーのデータを管理する変数を作成する
export const todoState = atom({
  key: "editUserAtom",
  default: {
    // ユニーク
    id: "",
    // todoの作成日（編集時に更新するかはまだ未定）
    productionDate: "",
    // todoの最終期限
    finalDeadline: "",
    // やること
    todo: "",
    // 作業済み
    isDone: "",
    // 重要度
    priority: "",
  },
});
