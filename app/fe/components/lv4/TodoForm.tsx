import { TodoFormValueType } from "../../types/todo";
import {
  Button,
  Center,
  Checkbox,
  Group,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { FormEvent, memo } from "react";

type TodoFormType = {
  editData: TodoFormValueType;
  loadTodoList: () => Promise<void>;
  form: UseFormReturnType<{
    id: string;
    productionDate: Date;
    finalDeadline: Date;
    todo: string;
    isDone: boolean;
    priority: number;
  }>;
  handleClickSendDbButton: (event: FormEvent<HTMLFormElement>) => void;
};

// eslint-disable-next-line react/display-name
export const TodoForm = memo((props: TodoFormType) => {
  const form = props.form;
  console.log("TodoForm");

  return (
    <Center>
      <div className=" m-4">
        <form onSubmit={props.handleClickSendDbButton}>
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
            inputFormat="YYYY-MM-DD"
            labelFormat="YYYY-MM"
            {...form.getInputProps("productionDate")}
          />
          <DatePicker
            required
            label="todoの最終期限:finalDeadline"
            placeholder="todoの最終期限"
            inputFormat="YYYY-MM-DD"
            labelFormat="YYYY-MM"
            // defaultValue={form.values.finalDeadline}
            {...form.getInputProps("finalDeadline")}
          />
          <TextInput
            required
            label="やること"
            placeholder="やることを入力してください"
            {...form.getInputProps("todo")}
          />
          {/* <Checkbox
            label="実行済み？"
            placeholder="実行済みならチェックしてください"
            {...form.getInputProps("isDone", { type: "checkbox" })}
          /> */}
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
