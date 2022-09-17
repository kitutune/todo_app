import React, { memo } from "react";

type SortButtonType = {
  buttonName: string;
  handleSort: (buttonName: string) => void;
};

// eslint-disable-next-line react/display-name
export const SortButton = memo((props: SortButtonType) => {
  // console.log("SortButton");

  return (
    <button onClick={() => props.handleSort(props.buttonName)}>
      {props.buttonName.toUpperCase()}
    </button>
  );
});
