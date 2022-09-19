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
import { useTodoForm } from "../../service/Form/useTodoForm";
import { TodoFormValueType } from "../../types/todo";
import { useRegistFormSelectSectionDB } from "../../usecase/todo/useRegistFormSelectSectionDB";

type TodoFormType = {
  editData: TodoFormValueType;
  loadTodoList: () => Promise<void>;
};

// eslint-disable-next-line react/display-name
export const TodoForm = memo((props: TodoFormType) => {
  console.log("TodoForm");
  const editData = useMemo(() => props.editData, [props.editData]);
  // useHook
  const registFormSelectSectionDB = useRegistFormSelectSectionDB();
  const form = useTodoForm();

  // 登録と編集
  const handleClickSendDbButton = form.onSubmit(
    async (values: TodoFormValueType) => {
      await registFormSelectSectionDB(values);
      props.loadTodoList();
      form.reset();
    }
  );

  const editTodo = useCallback(
    (editData: TodoFormValueType) => {
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
  }, [editData]);

  return (
    <Center>
      <div className=" m-4">
        <form onSubmit={handleClickSendDbButton}>
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
          <Group className="bg-blue" position="center" mt="md">
            <Button className="bg-black" type="submit">
              Submit
            </Button>
            {/* formのresetはシンプルなコードなので直書き */}
            <Button className="bg-black" onClick={() => form.reset()}>
              Reset
            </Button>
          </Group>
        </form>
      </div>
    </Center>
  );
});
