import { SortButton } from "components/lv2/SortButton";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TodoFormValue } from "types/todo";

type SortButtonsType = {
  setResult: Dispatch<SetStateAction<TodoFormValue[]>>;
  list: TodoFormValue[];
  editForm: TodoFormValue;
};

export const SortButtons = (props: SortButtonsType) => {
  type property = keyof TodoFormValue;

  const handleSort = (button: string) => {
    const key = button as property;
    console.log("click : " + key);

    const sortLst = props.list.sort(function compareNumbers(a, b) {
      console.log("a[key]a[key]", a[key]);
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

    // console.log("sortLstsortLstsortLst", sortLst);

    props.setResult((...prev) => sortLst);
  };

  const KEYS = Object.keys(props.editForm);

  return (
    <>
      {KEYS.map((key, index) => (
        // mapで必要なユニークとしてのkeyの設定
        <th  key={index}>
          <SortButton button={key} handleSort={handleSort} />
        </th>
      ))}
    </>
  );
};
