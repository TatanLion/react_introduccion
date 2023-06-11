import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider(props) {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);

  //Aqui vamos a crear los estados
  const [searchValue, setSearchvalue] = React.useState("");

  //Estado para cerrar el Modal
  const [openModal, setOpenModal] = React.useState(false);

  //Vamos a contar ToDos
  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  //Variable para verificar el tema de la busqueda
  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  //Vamos a marcar un toDo como completado
  const addTodo = (text) => {
    //No usamos el arreglo original, hacemos una copia de él para trabajar.
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      text,
    })
    saveTodos(newTodos);
  };

  //Vamos a marcar un toDo como completado
  const completeTodo = (text) => {
    //Aqui vamos a encontrar el index del elemento que estamos seleccionando
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    //No usamos el arreglo original, hacemos una copia de él para trabajar.
    const newTodos = [...todos];
    //Le decimos al nuevo arreglo que encuentre el elemento, acceda al completed y lo cambie a true, si ya esta en true lo puede quitar
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    saveTodos(newTodos);
  };

  //Vamos a marcar un toDo como eliminado
  const deleteTodo = (text) => {
    //Aqui vamos a encontrar el index del elemento que estamos seleccionando
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    //No usamos el arreglo original, hacemos una copia de él para trabajar.
    const newTodos = [...todos];
    //Le decimos al nuevo arreglo que encuentre el elemento, acceda al completed y lo cambie a true.
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  // //Vamos a generar un React Effect -- Este se generara justo antes del render
  // React.useEffect(() =>{
  //     console.log('Use Effect')
  // }, [totalTodos]); //Si le pasamos un array vacio esto indicara que solo se ejcutara una vez, si dentro del array le pasamos un valor signifcara que escuchara un cambio y se ejcutara cuando se genere dicho cambio.

  return (
    <TodoContext.Provider
      value={{
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchvalue,
        searchedTodos,
        addTodo,
        completeTodo,
        deleteTodo,
        openModal,
        setOpenModal,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

{
  /* <TodoContext.Provider></TodoContext.Provider> // -- Este lo usamos para envolver todo de nuestra aplicación
<TodoContext.Consumer></TodoContext.Consumer> // -- Este lo usamos para consumir todo de nuestra aplicación */
}

export { TodoContext, TodoProvider };
