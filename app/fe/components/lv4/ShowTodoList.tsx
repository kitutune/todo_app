import { Checkbox } from '@mantine/core';
import dayjs from 'dayjs';
import React, { memo, useCallback } from 'react'
import { TodoFormValue } from 'types/todo';
import { useDeleteMethod } from 'usecase/todo/useDeleteMethod';
import { useEditMethod } from 'usecase/todo/useEditMethod';
import { useIsDoneMethod } from 'usecase/todo/useIsDoneMethod';

// eslint-disable-next-line react/display-name
export const ShowTodoList = memo((props:{list:TodoFormValue[],loadTodoList: ()=>Promise<void>,setEditForm: (arg0: TodoFormValue) => void}) => {

    const deleteMethod = useDeleteMethod();
    const isDoneMethod = useIsDoneMethod();
    const editMethod = useEditMethod();
  
    // useHook
    // 編集ボタン
    const fetchEditTodoId = useCallback(
      async (e: React.MouseEvent<HTMLElement>) => {
        props.setEditForm(await editMethod(e));
      },
      [editMethod, props]
    );
  
  
  
    // 削除ボタン
    const fetchDeleteTodoId = useCallback(
      async (e: React.MouseEvent<HTMLElement>) => {
        await deleteMethod(e);
        props.loadTodoList();
      },
      [deleteMethod, props]
    );
  
    // 済みボタン
    const fetchIsDoneTodoId = useCallback(
      async (e: React.MouseEvent<HTMLElement>) => {
        await isDoneMethod(e);
        props.loadTodoList();
      },
      [isDoneMethod, props]
    );

  return ( <tbody>
    {  props.list.map((todoData:TodoFormValue, index: React.Key ) => (
        <tr key={index}>
          <td className="border px-4 py-2 " >
            <Checkbox
            className="flex-col"
              checked={todoData.isDone === "true" ? true : false}
              data-id={todoData.id}
              onClick={fetchIsDoneTodoId}
            />
            {/* <input type="checkbox" 
            
              checked={todoData.isDone === "true" ? true : false}
              data-id={todoData.id}
              onClick={fetchIsDoneTodoId}
            /> */}
          </td>
          <td className="border px-4 py-2">{todoData.id}</td>
          <td className="border px-4 py-2">
            {/* ライブラリdayjsを使用してDate型をフォーマット */}
            {dayjs(todoData.productionDate).locale("ja").format("YYYY/MM/DD(dd)")}
          </td>
          <td className="border px-4 py-2">
            {/* ライブラリdayjsを使用してDate型をフォーマット */}
            {dayjs(todoData.finalDeadline).locale("ja").format("YYYY/MM/DD(dd)")}
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
      ))}</tbody>
  )
})
