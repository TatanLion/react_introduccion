import React from "react";
//Importar Componentes
import { TodoContext } from "../TodoContext";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch/index.js";
import { TodoList } from "../TodoList/index.js";
import { TodoItem } from "../TodoItem/index.js";
import { TodoForm } from "../TodoForm";
import { CreateTodoButton } from "../CreateTodoButton/index.js";
import { Modal } from "../Modal/index";

function AppUI() {
  const { error, loading, searchedTodos, completeTodo, deleteTodo, openModal, setOpenModal } =
    React.useContext(TodoContext);
  return (
    <React.Fragment>
      <TodoCounter />

      <TodoSearch />

      <TodoList>
        {error && <p className="text_todo_list">Tenemos un error, no worries</p>}
        {loading && <p className="text_todo_list">Estamos cargando, no worries</p>}
        {!loading && !searchedTodos.length && <p className="text_todo_list">Crea tu primer ToDo</p>}

        {searchedTodos.map((todo) => (
          //Aqui para que se vea que no es necesario hacer un render de manera inncesaria, se le agrega un key para que React sepa
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      {openModal && (
        <Modal>
          <TodoForm />
        </Modal>
      )}

      <CreateTodoButton 
        setOpenModal={setOpenModal}
      />
    </React.Fragment>
  );
}

export { AppUI };
