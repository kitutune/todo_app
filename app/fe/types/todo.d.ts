export type TodoFormValueType = {
  id: string | int;
  // todoの作成日（編集時に更新するかはまだ未定）
  productionDate: Date;
  // todoの最終期限
  finalDeadline: Date;
  // やること
  todo: string;
  // 作業済み
  isDone: string | boolean;
  // 重要度
  priority: int;
};
