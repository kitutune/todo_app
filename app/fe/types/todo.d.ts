// 登録前のユーザー
// formで入力されているデータなのでまだidはなく必須項目以外はundefined許容
export type TodoForm = {
  id?: string;
  // todoの作成日（編集時に更新するかはまだ未定）
  productionDate: Date;
  // todoの最終期限
  finalDeadline: Date;
  // やること
  todo: string;
  // 作業済み
  isDone?: string;
  // 重要度
  priority?: string;
};

// 既に登録されているユーザー
export type RegistedTodo = {
  id: string;
  // todoの作成日（編集時に更新するかはまだ未定）
  productionDate: Date;
  // todoの最終期限
  finalDeadline: Date;
  // やること
  todo: string;
  // 作業済み
  isDone: string;
  // 重要度
  priority: string;
};
