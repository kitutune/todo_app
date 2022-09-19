import { Checkbox } from "@mantine/core";
import dayjs from "dayjs";
import React, { memo, useCallback } from "react";
import { TodoFormValueType } from "types/todo";
import { useDeleteTodoMethod } from "usecase/todo/useDeleteTodoMethod";
import { useEditTodoMethod } from "usecase/todo/useEditTodoMethod";
import { useIsDoneMethod } from "usecase/todo/useIsDoneMethod";

type ShowTodoListType = {
  list: TodoFormValueType[];
  loadTodoList: () => Promise<void>;
  setEditForm: (arg0: TodoFormValueType) => void;
};

// eslint-disable-next-line react/display-name
export const ShowTodoList = memo((props: ShowTodoListType) => {
  // console.log("ShowTodoList");

  // useHook
  const deleteTodoMethod = useDeleteTodoMethod();
  const isDoneMethod = useIsDoneMethod();
  const editTodoMethod = useEditTodoMethod();

  // 編集ボタン
  const handleClickEditButton = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      props.setEditForm(await editTodoMethod(e));
    },
    [editTodoMethod, props]
  );

  // 削除ボタン
  const handleClickDeleteButton = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      await deleteTodoMethod(e);
      props.loadTodoList();
    },
    [deleteTodoMethod, props]
  );

  // 済みボタン
  const handleClickIsDoneCheckBox = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      await isDoneMethod(e);
      props.loadTodoList();
    },
    [isDoneMethod, props]
  );

  return (
    <tbody>
      {props.list.map((todoData: TodoFormValueType, index: React.Key) => (
        <tr key={index}>
          <td className="border px-4 py-2 ">
            <Checkbox
              className="flex-col"
              defaultChecked={todoData.isDone === "true" ? true : false}
              data-id={todoData.id}
              onClick={handleClickIsDoneCheckBox}
            />
          </td>
          <td className="border px-4 py-2">{todoData.id}</td>
          <td className="border px-4 py-2">
            {/* ライブラリdayjsを使用してDate型をフォーマット */}
            {dayjs(todoData.productionDate)
              .locale("ja")
              .format("YYYY/MM/DD(dd)")}
          </td>
          <td className="border px-4 py-2">
            {/* ライブラリdayjsを使用してDate型をフォーマット */}
            {dayjs(todoData.finalDeadline)
              .locale("ja")
              .format("YYYY/MM/DD(dd)")}
          </td>
          <td className="border px-4 py-2">{todoData.todo}</td>
          <td className="border px-4 py-2">{todoData.isDone}</td>
          <td className="border px-4 py-2">{todoData.priority}</td>
          <td
            className="border px-4 py-2 cursor-pointer"
            //  ※カスタムパラメータは"data-"という形式でないと型エラーを吐く
            data-id={todoData.id}
            onClick={handleClickEditButton}
          >
            編集
          </td>
          <td
            className="border px-4 py-2 cursor-pointer"
            data-id={todoData.id}
            onClick={handleClickDeleteButton}
          >
            削除
          </td>
        </tr>
      ))}
    </tbody>
  );
});
