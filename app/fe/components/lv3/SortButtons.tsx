import { SortButton } from "components/lv2/SortButton";
import React, { Dispatch, memo, SetStateAction, useCallback } from "react";
import { TodoFormValue } from "types/todo";

type SortButtonsType = {
  setResult: Dispatch<SetStateAction<TodoFormValue[]>>;
  list: TodoFormValue[];
  editForm: TodoFormValue;
};

/**
 * type ReadonlyProperty = "id" | "productionDate" | "finalDeadline" | "todo" | "isDone" | "priority"
 */

// eslint-disable-next-line react/display-name
export const SortButtons = memo((props: SortButtonsType) => {
  // console.log("SortButtons");
  type Property = keyof TodoFormValue;
  type ReadonlyProperty = Readonly<Property>;

  const handleSort = useCallback(
    (buttonName: string) => {
      console.log("handleSort");

      const key = buttonName as ReadonlyProperty;
      // console.log("click : " + key);

      const sortLst = props.list.sort(function compareNumbers(a, b) {
        a = a[key];
        b = b[key];
        if (a === b) {
          return 0;
        }
        if (a > b) {
          return 1;
        }
        // a < b
        return -1;
      });

      props.setResult([...sortLst]);
    },
    [props]
  );

  const KEYS = Object.keys(props.editForm);

  return (
    <>
      {KEYS.map((key, index) => (
        // mapで必要なユニークとしてのkeyの設定
        <th key={index}>
          <SortButton buttonName={key} handleSort={handleSort} />
        </th>
      ))}
    </>
  );
});
