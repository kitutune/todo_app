import React, { memo } from "react";

type SortButtonType = {
  key: number;
  button: string;
  handleSort: (key: string) => void;
};

// eslint-disable-next-line react/display-name
export const SortButton = memo((props: SortButtonType) => {
  return (
    <button onClick={() => props.handleSort(props.button)}>
      {props.button.toUpperCase()}
    </button>
  );
});
