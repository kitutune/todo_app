import { SortButton } from "components/lv2/SortButton";
import React, { Dispatch, memo, SetStateAction, useCallback } from "react";
import { TodoFormValueType } from "types/todo";

type SortButtonsType = {
  setResult: Dispatch<SetStateAction<TodoFormValueType[]>>;
  list: TodoFormValueType[];
  editFormData: TodoFormValueType;
};

/**
 * type ReadonlyProperty = "id" | "productionDate" | "finalDeadline" | "todo" | "isDone" | "priority"
 */

// eslint-disable-next-line react/display-name
export const SortButtons = memo((props: SortButtonsType) => {
  // console.log("SortButtons");
  type Property = keyof TodoFormValueType;
  type ReadonlyProperty = Readonly<Property>;

  const handleClickSortButton = useCallback(
    (buttonName: string) => {
      console.log("handleClickSortButton");

      const key = buttonName as ReadonlyProperty;

      const sortLst = props.list.sort(function compareNumbers(a, b) {
        // targetPropertyを設定
        const targetA = a[key];
        const targetB = b[key];
        if (targetA === targetB) {
          return 0;
        }
        if (targetA > targetB) {
          return 1;
        }
        // targetA < targetB
        return -1;
      });

      props.setResult([...sortLst]);
    },
    [props]
  );

  const TodoFormValueOfKey = Object.keys(props.editFormData);

  return (
    <>
      {TodoFormValueOfKey.map((key, index) => (
        // mapで必要なユニークとしてのkeyの設定
        <th key={index}>
          <SortButton
            buttonName={key}
            handleClickSortButton={handleClickSortButton}
          />
        </th>
      ))}
    </>
  );
});
