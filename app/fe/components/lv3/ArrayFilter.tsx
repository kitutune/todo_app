import React, { Dispatch, memo, SetStateAction, useState } from "react";
import { TodoFormValue } from "types/todo";

type propsType = {
  list: TodoFormValue[];
  setResult: Dispatch<SetStateAction<TodoFormValue[]>>;
};

// eslint-disable-next-line react/display-name
export const ArrayFilter = memo((props: propsType) => {
  const [text, setText] = useState("");

  props.setResult(props.list.filter((todo) => todo.todo.match(text)));

  return (
    <div className="border-solid">
      <input
        className="border-solid border-stone-900 bg-orange-200 text-stone-900"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
    </div>
  );
});
