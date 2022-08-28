import axios from "axios";

export const useDeleteTodo = () => {
  const deleteTodo = (id: string) => {
    axios.delete(`http://localhost:8080/api/delete/${id}`).then((res) => {
      console.log("res.data", res.data);
    });
  };

  return deleteTodo;
};
