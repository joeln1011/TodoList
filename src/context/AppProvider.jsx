import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [todoList, setTodoList] = useState([
    {
      id: "1",
      name: "Go to School",
      isImportant: false,
      isCompleted: true,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "2",
      name: "Go to Work",
      isImportant: true,
      isCompleted: false,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "3",
      name: "Play Game",
      isImportant: true,
      isCompleted: false,
      isDeleted: false,
      category: "travel",
    },
  ]);

  const [selectedFilterId, setSelectedFilterId] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [activeTodoItemId, setActiveTodoItem] = useState();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleCompleteCheckboxChange = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const handleTodoItemClick = (todoId) => {
    setShowSidebar(true);
    setActiveTodoIteamId(todoId);
  };

  const handleTodoItemChange = (newTodo) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  return (
    <AppContext.Provider
      value={{
        todoList,
        setTodoList,
        selectedCategoryId,
        setSelectedCategoryId,
        selectedFilterId,
        setSelectedFilterId,
        searchText,
        setSearchText,
        activeTodoItemId,
        setActiveTodoItem,
        showSidebar,
        setShowSidebar,
        handleCompleteCheckboxChange,
        handleTodoItemClick,
        handleTodoItemChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.prototype = {
  children: PropTypes.element,
};

export default AppProvider;
export const useAppContext = () => {
  return useContext(AppContext);
};
