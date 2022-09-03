import {
  Button,
  Center,
  Checkbox,
  Group,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useCallback, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { editTodoState } from "../atom/PUT/Todo";
import { useConvert } from "../service/Convert/useConvert";
import { useTodoForm } from "../service/Form/useTodoForm";
import { usePostTodo } from "../service/Post/usePostTodo";
import { usePutTodo } from "../service/Put/usePutTodo";
import { TodoFormValue } from "../types/todo";

export const TodoForm = () => {
  // useHook
  const dbEdited = usePutTodo();
  const dbRegistered = usePostTodo();
  const convertFormToEntity = useConvert();
  const form = useTodoForm();

  // Recoil
  // 状態を取得する側のRecoil:useRecoilValue
  const recoilEditTodo = useRecoilValue(editTodoState);
  console.log("使う側のRecol", recoilEditTodo);

  const getFormTodo = form.onSubmit((values: TodoFormValue) => {
    console.log("values", values);
    sendingMethod(values);
  });

  const editTodo = (recoilEditTodo: TodoFormValue) => {
    if (recoilEditTodo.id === "") {
      console.log("中身が空");
      return;
    }
    form.setValues({
      id: recoilEditTodo.id,
      productionDate: recoilEditTodo.productionDate,
      finalDeadline: recoilEditTodo.finalDeadline,
      todo: recoilEditTodo.todo,
      isDone: recoilEditTodo.isDone == "true" ? true : false,
      priority: Number(recoilEditTodo.priority),
    });
  };

  // 編集データを補完するrecoilEditTodoに値が取得された際に
  // formに編集データをセットするかの分岐処理
  useEffect(() => {
    // ログでどう分岐されるか見るよう // 普段はコメントアウト
    // console.log(recoilEditTodo);
    // console.log(!recoilEditTodo);
    // console.log(!!recoilEditTodo);
    // ①必須項目である名前が空文字なら既に登録されているデータとして
    // 存在しているのは異常なので何もせずに返す
    if (recoilEditTodo.id === "") {
      console.log("中身が空");
      return;
    }
    // ② ①以外の場合は編集データとして扱う
    editTodo(recoilEditTodo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recoilEditTodo]);

  // formに値がセットされた際にどう処理するか分岐させる
  const sendingMethod = useCallback((formTodo: TodoFormValue) => {
    // ①必須項目が空文字なら処理せず返す
    if (formTodo.todo === "") {
      return console.log("空の値は登録できません");
    }
    // ②form形式のtodoをentity形式にコンバート
    const dbTodo = convertFormToEntity(formTodo);

    // ③編集データを補完するrecoilEditTodoにデータが存在するなら編集データとして処理する
    if (!(recoilEditTodo.id == "") || !(formTodo.id == "")) {
      console.log("編集します");
      console.log("編集後の内容", formTodo);
      dbEdited(dbTodo);
    } else {
      // ④上記条件以外なら新規登録として扱う
      console.log("新規登録します");
      dbRegistered(dbTodo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetButton = () => {
    form.reset();
    form.setValues({
      // ユニーク
      id: "",
      productionDate: new Date(),
      finalDeadline: new Date(),
      todo: "",
      isDone: false,
      priority: 1,
    });
  };

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
            <Button className="bg-black" onClick={resetButton}>
              Reset
            </Button>
          </Group>
        </form>
      </Center>
    </div>
  );
};
