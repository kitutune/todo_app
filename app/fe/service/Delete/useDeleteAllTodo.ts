import axios from "axios";

export const useDeleteAllTodo = () => {
  // console.log("useDeleteAllTodo");

  const deleteAllTodo = () => {
    axios.delete(`http://localhost:8080/api/alldelete`).then((res) => {
      // console.log("res.data", res.data);
    });
  };

  return deleteAllTodo;
};
