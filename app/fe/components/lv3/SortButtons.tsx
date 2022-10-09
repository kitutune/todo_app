import { SortButton } from "components/lv2/SortButton";
import React, {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useState,
} from "react";
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

  const [beforeKey, setBeforeKey] = useState("");

  const handleClickSortButton = useCallback(
    (buttonName: string) => {
      console.log("handleClickSortButton");

      const key = buttonName as ReadonlyProperty;

      // 降順にすべきかどうか（前回と同じボタンを押した場合は降順にする）
      const shouldDesc = beforeKey === buttonName;
      const sortLst = props.list.sort(function compareNumbers(a, b) {
        // targetPropertyを設定
        const targetA = a[key];
        const targetB = b[key];

        if (shouldDesc) {
          if (targetA < targetB) return 1;
          if (targetA > targetB) return -1;
          return 0;
        }
        // 上記以外なら、昇順にする。
        if (targetA < targetB) return -1;
        if (targetA > targetB) return 1;
        return 0;
      });

      props.setResult([...sortLst]);
      // ２度同じボタンを押したら、ステートを初期化する（降順モードから昇順モードに戻したいので）
      setBeforeKey((before: string) =>
        before === buttonName ? "" : buttonName
      );
    },
    [beforeKey, props]
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
