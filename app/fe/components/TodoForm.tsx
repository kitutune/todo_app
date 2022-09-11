import {
  Button,
  Center,
  Checkbox,
  Group,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { memo, useCallback, useEffect, useMemo } from "react";
import { useTodoForm } from "../service/Form/useTodoForm";
import { TodoFormValue } from "../types/todo";
import { useRegistFormSelectSectionDB } from "../usecase/todo/useRegistFormSelectSectionDB";

// eslint-disable-next-line react/display-name
export const TodoForm = memo(
  (props: { editData: TodoFormValue; loadTodoList: () => Promise<void> }) => {
    const editData = useMemo(() => props.editData, [props.editData]);
    const loadTodoList = props.loadTodoList;
    // useHook
    const registFormSelectSectionDB = useRegistFormSelectSectionDB();
    const form = useTodoForm();

    const getFormTodo = form.onSubmit(async (values: TodoFormValue) => {
      await registFormSelectSectionDB(values);
      loadTodoList();
      form.reset();
    });

    const editTodo = useCallback(
      (editData: TodoFormValue) => {
        if (editData.id === "") {
          console.log("idが空なので編集データではありません");
          return;
        }
        form.setValues({
          id: editData.id,
          productionDate: editData.productionDate,
          finalDeadline: editData.finalDeadline,
          todo: editData.todo,
          isDone: editData.isDone == "true" ? true : false,
          priority: Number(editData.priority),
        });
      },
      [form]
    );

    useEffect(() => {
      editTodo(editData);
      return () => {
        editTodo({
          // ユニーク
          id: "",
          // todoの作成日（編集時に更新するかはまだ未定）
          productionDate: new Date(),
          // todoの最終期限
          finalDeadline: new Date(),
          // やること
          todo: "",
          // 作業済み
          isDone: false,
          // 重要度
          priority: 1,
        });
      };
    }, [editData]);

    return (
      <div className="mt-20">
        <Center>
          <form onSubmit={getFormTodo}>
            <TextInput
              // className="invisible"
              disabled
              label="id"
              placeholder="id"
              {...form.getInputProps("id")}
            />
            <DatePicker
              // className="invisible"
              disabled
              label="todoの作成日:productionDate"
              placeholder="todoの作成日"
              {...form.getInputProps("productionDate")}
            />

            <DatePicker
              required
              label="todoの最終期限:finalDeadline"
              placeholder="todoの最終期限"
              {...form.getInputProps("finalDeadline")}
            />
            <TextInput
              required
              label="やること"
              placeholder="やることを入力してください"
              {...form.getInputProps("todo")}
            />
            <Checkbox
              label="実行済み？"
              placeholder="実行済みならチェックしてください"
              {...form.getInputProps("isDone", { type: "checkbox" })}
            />
            <NumberInput
              label="重要度"
              placeholder="重要度を１〜３で入力してください"
              min={1}
              max={3}
              {...form.getInputProps("priority")}
            />
            <Group className="bg-blue" position="right" mt="md">
              <Button className="bg-black" type="submit">
                Submit
              </Button>
              {/* formのresetはシンプルなコードなので直書き */}
              <Button className="bg-black" onClick={() => form.reset()}>
                Reset
              </Button>
            </Group>
          </form>
        </Center>
      </div>
    );
  }
);
