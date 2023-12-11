import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTodoList,
  addTodo,
  updateTodo,
  sortTodo,
  toggleCompleted,
} from "../Store/ToDoSlice.jsx";
import { EmptySvg } from ".";
import { TiPencil } from "react-icons/ti";
import { BsTrash } from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";

function TodoList() {
  const dispatch = useDispatch();
  const { currentColor } = useStateContext();
  const todoList = useSelector((state) => state.todo.todoList);
  const sortCriteria = useSelector((state) => state.todo.sortCriteria);
  const [showModal, setShowModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList]);
  useEffect(() => {
    const localTodoList = JSON.parse(localStorage.getItem("todoList"));
    if (localTodoList) {
      dispatch(setTodoList(localTodoList));
    }
  }, []);

  const handleAddTodo = (task) => {
    if (task.trim().length === 0) {
      alert("Please enter a task");
    } else {
      dispatch(addTodo({ task: task, id: Date.now() }));
      setNewTask("");
      setShowModal(true);
    }
  };
  const handleUpdateToDoList = (id, task) => {
    if (task.trim().length === 0) {
      alert("Please enter a task");
    } else {
      dispatch(updateTodo({ task: task, id: id }));
      setShowModal(false);
    }
  };
  const handleDeleteToDo = (id) => {
    const updatedToDoList = todoList.filter((todo) => todo.id != id);
    dispatch(setTodoList(updatedToDoList));
    localStorage.setItem("todoList", JSON.stringify(updatedToDoList));
  };

  function handleSort(sortCriteria) {
    dispatch(sortTodo(sortCriteria));
  }

  const sortToDoList = todoList.filter((todo) => {
    if (sortCriteria === "All") return true;
    if (sortCriteria === "Completed" && todo.completed) return true;
    if (sortCriteria === "Not Completed" && !todo.completed) return true;
    return false;
  });

  const handleToggleCompleted = (id) => {
    dispatch(toggleCompleted({ id }));
  };
  return (
    <div>
      {showModal && (
        <div className="fixed w-full left-0 top-0 z-10 h-full bg-transparentBlack flex items-center justify-center">
          <div className="bg-white p-8 rounded-md flex flex-col">
            <input
              className="border p-2 rounded-md outline-none mb-8"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder={
                currentTodo ? "Update your task here" : "Enter your task here"
              }
            />
            <div className="flex justify-between gap-5">
              {currentTodo ? (
                <>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      handleUpdateToDoList(currentTodo.id, newTask);
                    }}
                    className="text-white py-3 px-10 rounded-md"
                    style={{ backgroundColor: currentColor }}
                  >
                    Save
                  </button>
                  <button
                    className="bg-Tangaroa rounded-md text-white py-3 px-10"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-Tangaroa rounded-md text-white py-3 px-10"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white py-3 px-10 rounded-md"
                    style={{ backgroundColor: currentColor }}
                    onClick={() => {
                      handleAddTodo(newTask);
                      setShowModal(false);
                    }}
                  >
                    Add
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className=" flex items-center justify-center flex-col">
        {todoList.length === 0 ? (
          <div className="mb-6">
            <div className="sm:w-[100%] sm:h-[500px] min-w-[250px]">
              <EmptySvg />
            </div>
            <p className="text-center text-Gray">
              You have no todo's, please add one.
            </p>
          </div>
        ) : (
          <div className="container mx-auto mt-6">
            <div className="flex justify-center items-center mb-6">
              <select
                onChange={(e) => handleSort(e.target.value)}
                className="p-2 outline-none text-sm border-1 cursor-pointer todo-select"
              >
                <option value="All" className="text-sm">
                  All
                </option>
                <option value="Completed" className="text-sm">
                  Completed
                </option>
                <option value="Not Completed" className="text-sm">
                  Not Completed
                </option>
              </select>
            </div>
            <section className="flex flex-col">
            {sortToDoList.map((todo) => (
              <button
                type="button"
                className={`${todo.completed ? " opacity-30" : "opacity-100"}`}
                onClick={() => {
                  handleToggleCompleted(todo.id);
                }}
              >
                <div>
                  <div
                    key={todo.id}
                    style={{
                      border: currentColor,
                      borderWidth: 1,
                      borderStyle: "solid",
                    }}
                    className="flex items-center justify-between mb-6 mx-auto w-full md:w-[75%] rounded-md p-4"
                  >
                    <div
                      className={`${
                        todo.completed
                          ? "line-through text-gray-400"
                          : "text-black"
                      }`}
                      onClick={() => {
                        handleToggleCompleted(todo.id);
                      }}
                    >
                      {todo.task}
                    </div>
                    <div>
                      <button
                        style={{ backgroundColor: currentColor }}
                        className="text-white p-1 rounded-md ml-2"
                        onClick={() => {
                          setShowModal(true);
                          setCurrentTodo(todo);
                          setNewTask(todo.task);
                        }}
                      >
                        <TiPencil />
                      </button>
                      <button
                        className=" bg-red-500 text-white p-1 rounded-md ml-2"
                        onClick={() => handleDeleteToDo(todo.id)}
                      >
                        <BsTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </button>
            ))}
            </section>
          </div>
        )}
        <button
          className="text-center text-white py-3 px-10 rounded-md"
          style={{ backgroundColor: currentColor }}
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default TodoList;
