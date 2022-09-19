import { Checkbox } from "@mantine/core";
import dayjs from "dayjs";
import React, { memo } from "react";
import { TodoFormValueType } from "types/todo";

type ShowTodoListType = {
  list: TodoFormValueType[];
  loadTodoList: () => Promise<void>;
  setEditFormData: (arg0: TodoFormValueType) => void;
  handleClickEditButton: (e: React.MouseEvent<HTMLElement>) => Promise<void>;
  handleClickDeleteButton: (e: React.MouseEvent<HTMLElement>) => Promise<void>;
  handleClickIsDoneCheckBox: (
    e: React.MouseEvent<HTMLElement>
  ) => Promise<void>;
};

// eslint-disable-next-line react/display-name
export const ShowTodoList = memo((props: ShowTodoListType) => {
  // console.log("ShowTodoList");

  return (
    <tbody>
      {props.list.map((todoData: TodoFormValueType, index: React.Key) => (
        <tr key={index}>
          <td className="border px-4 py-2 ">
            <Checkbox
              className="flex-col"
              defaultChecked={todoData.isDone === "true" ? true : false}
              data-id={todoData.id}
              onClick={props.handleClickIsDoneCheckBox}
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
            onClick={props.handleClickEditButton}
          >
            編集
          </td>
          <td
            className="border px-4 py-2 cursor-pointer"
            data-id={todoData.id}
            onClick={props.handleClickDeleteButton}
          >
            削除
          </td>
        </tr>
      ))}
    </tbody>
  );
});
