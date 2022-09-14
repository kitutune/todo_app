import { Checkbox } from "@mantine/core";
import dayjs from "dayjs";
import React, { memo, useCallback } from "react";
import { TodoFormValue } from "types/todo";
import { useDeleteTodoMethod } from "usecase/todo/useDeleteTodoMethod";
import { useEditTodoMethod } from "usecase/todo/useEditTodoMethod";
import { useIsDoneMethod } from "usecase/todo/useIsDoneMethod";

type ShowTodoListType = {
  list: TodoFormValue[];
  loadTodoList: () => Promise<void>;
  setEditForm: (arg0: TodoFormValue) => void;
};

// eslint-disable-next-line react/display-name
export const ShowTodoList = memo((props: ShowTodoListType) => {
  // useHook
  const deleteTodoMethod = useDeleteTodoMethod();
  const isDoneMethod = useIsDoneMethod();
  const editTodoMethod = useEditTodoMethod();

  // 編集ボタン
  const fetchEditTodoId = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      props.setEditForm(await editTodoMethod(e));
    },
    [editTodoMethod, props]
  );

  // 削除ボタン
  const fetchDeleteTodoId = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      await deleteTodoMethod(e);
      props.loadTodoList();
    },
    [deleteTodoMethod, props]
  );

  // 済みボタン
  const fetchIsDoneTodoId = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      await isDoneMethod(e);
      props.loadTodoList();
    },
    [isDoneMethod, props]
  );
  console.log("props.listprops.listprops.listprops.listprops.list", props.list);

  return (
    <tbody>
      {props.list.map((todoData: TodoFormValue, index: React.Key) => (
        <tr key={index}>
          <td className="border px-4 py-2 ">
            <Checkbox
              className="flex-col"
              checked={todoData.isDone === "true" ? true : false}
              data-id={todoData.id}
              onClick={fetchIsDoneTodoId}
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
          <td
            className="border px-4 py-2"
            // ※カスタムパラメータは"data-"という形式でないと型エラーを吐く
            data-isDone={todoData.isDone}
          >
            {todoData.isDone}
          </td>
          <td className="border px-4 py-2">{todoData.priority}</td>
          <td
            className="border px-4 py-2 cursor-pointer"
            //  ※カスタムパラメータは"data-"という形式でないと型エラーを吐く
            data-id={todoData.id}
            onClick={fetchEditTodoId}
          >
            編集
          </td>
          <td
            className="border px-4 py-2 cursor-pointer"
            data-id={todoData.id}
            onClick={fetchDeleteTodoId}
          >
            削除
          </td>
        </tr>
      ))}
    </tbody>
  );
});
