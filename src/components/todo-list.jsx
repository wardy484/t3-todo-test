import { trpc} from "../utils/trpc";
import React from "react";

const todoList = () => {
    const getTodos = trpc.useQuery(["todos.getAll"]);
    const utils = trpc.useContext();
    const deleteTodo = trpc.useMutation(["todos.delete"], {
        onSuccess: () => {
          utils.invalidateQueries(["todos.getAll"]);
        },
      });

    const completeTodo = trpc.useMutation(["todos.complete"], {
        onSuccess: () => {
            utils.invalidateQueries(["todos.getAll"]);
        }
    });
    
    return <ul>
        {getTodos.data?.map((todo) => (
            <li key={todo.id} className="my-3">
                <span className={todo.completed ? "line-through" : ""}>
                    {todo.title}
                </span> - 
                <button className="btn btn-danger" onClick={() => deleteTodo.mutate({ id: todo.id })}>Delete</button>

                {!todo.completed && (
                    <button className="btn btn-success ml-3" onClick={() => completeTodo.mutate({ id: todo.id })}>Complete</button>
                )}
            </li>
        ))}
    </ul>
}

export default todoList;