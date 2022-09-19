import React, { memo } from "react";

type SortButtonType = {
  buttonName: string;
  handleClickSortButton: (buttonName: string) => void;
};

// eslint-disable-next-line react/display-name
export const SortButton = memo((props: SortButtonType) => {
  // console.log("SortButton");

  return (
    <button onClick={() => props.handleClickSortButton(props.buttonName)}>
      {props.buttonName.toUpperCase()}
    </button>
  );
});
