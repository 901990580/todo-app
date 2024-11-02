import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  let [todos, setTodos] = useState([
    { id: 1, completed: false, value: "dars qilish" },
    { id: 2, completed: false, value: "kitob uqish" },
  ]);
  let [inpValue, setInpValue] = useState("");

  function submitHandler(event) {
    event.preventDefault();

    if (inpValue) {
      setTodos([
        ...todos,
        {
          id: new Date(),
          completed: false,
          value: inpValue,
        },
      ]);

      setInpValue("");
    } else {
      toast.error("Inputni tuldiring");
    }
  }

  function deleteHandler(id) {
    setTodos(
      todos.filter((item) => {
        return id !== item.id;
      })
    );
  }

  function changeCheckHandler(item) {
    setTodos((prev) =>
      prev.map((itemEl) => {
        return itemEl.id === item.id
          ? { ...itemEl, completed: !itemEl.completed }
          : itemEl;
      })
    );
  }
  return (
    <>
      <div className="container">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <h2>Todo List</h2>
        <form onSubmit={submitHandler}>
          <label>enter todos</label> <br />
          <input
            value={inpValue}
            onChange={(e) => {
              setInpValue(e.target.value);
            }}
            type="text"
          />
          <button type="submit">submit</button>
        </form>

        {todos.length > 0 ? (
          <div>
            <ul>
              {todos.map((item) => {
                return (
                  <li key={item.id}>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => {
                        changeCheckHandler(item);
                      }}
                    />

                    <h3
                      style={{
                        textDecoration: item.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {item.value}
                    </h3>

                    <button onClick={() => deleteHandler(item.id)}>
                      delete
                    </button>
                  </li>
                );
              })}
            </ul>

            <button
              onClick={() => {
                setTodos([]);
              }}
            >
              clear all
            </button>
          </div>
        ) : (
          <h3>Vazifani kiriting</h3>
        )}
      </div>
    </>
  );
};

export default App;
