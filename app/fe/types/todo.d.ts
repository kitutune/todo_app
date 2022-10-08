export type TodoFormValueType = {
  id: string;
  // todoの作成日（編集時に更新するかはまだ未定）
  productionDate: Date;
  // todoの最終期限
  finalDeadline: Date;
  // やること
  todo: string;
  // 作業済み
  isDone: boolean;
  // 重要度
  priority: number;
};

export type TodoBackendValueType = {
  id: string;
  // todoの作成日（編集時に更新するかはまだ未定）
  productionDate: string;
  // todoの最終期限
  finalDeadline: string;
  // やること
  todo: string;
  // 作業済み
  isDone: string;
  // 重要度
  priority: string;
  // todoの最終期限
  finalDeadline: Date;
  // やること
  todo: string;
  // 作業済み
  isDone: string;
  // 重要度
  priority: number;
};
