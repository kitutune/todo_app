import React, { Dispatch, memo, SetStateAction, useEffect, useState } from "react";
import { TodoFormValue } from "types/todo";

type propsType = {
  list: TodoFormValue[];
  setResult: Dispatch<SetStateAction<TodoFormValue[]>>;
};

// eslint-disable-next-line react/display-name
export const ArrayFilter = memo((props: propsType) => {
  // console.log("ArrayFilter");

  const [text, setText] = useState("");

  // props.setResult(props.list.filter((todo) => todo.todo.match(text)));

useEffect(() => {
  props.setResult(props.list.filter((todo) => todo.todo.match(text)));
}, [props, text])


  return (
    <>
      <label htmlFor="search">Search</label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          type="search"
          id="search"
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
          required
        />
      </div>
    </>
  );
});