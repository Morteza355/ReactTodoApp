import { deleteTodo, editTodo, markAsDone } from "../data/data";
import { BLUE, DARK } from "../helpers/colors";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Todo = ({ todo, todosPage }) => {
  const [InputDisplay, setInputDisplay] = useState(false);
  const [displayToolTip, setDisplayToolTip] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const setInfo = (title, displayToolTip) => {
    if (displayToolTip && todosPage) {
      return "Click To Mark As Done";
    } else if (displayToolTip && !todosPage) {
      return "Click To Mark as not Done";
    }
    return title;
  };

  return (
    <section
      onMouseOver={(e) => {
        const elements = document.getElementsByClassName("todo");
        Array.from(elements).forEach((elem) => {
          if (e.target.contains(elem)) {
            setDisplayToolTip(true);
          }
        });
      }}
      onMouseOut={(e) => {
        const elements = document.getElementsByClassName("todo");
        Array.from(elements).forEach((elem) => {
          if (e.target.contains(elem)) {
            setDisplayToolTip(false);
          }
        });
      }}
      onClick={(e) => {
        const elements = document.getElementsByClassName("todo");
        Array.from(elements).forEach((elem) => {
          if (e.target.contains(elem)) {
            markAsDone(todo.id);
            navigate(`/todos/${location.search}`);
          }
        });
      }}
      style={{ backgroundColor: BLUE, animation: "opacity .3s" }}
      className="todo cursor-pointer flex justify-between rounded-sm  text-white w-full  items-center"
    >
      <section
        className={`text-sm sm:text-base ${displayToolTip && "text-gray-400"} ${
          !todosPage && "line-through"
        } pl-3`}
      >
        {setInfo(todo.title, displayToolTip)}
      </section>

      <section className="flex items-center gap-x-1 sm:gap-x-2 p-3">
        <section
          className="flex justify-center items-center rounded-full bg-rose-600 text-sm sm:text-base"
          style={{ padding: ".5rem .7rem" }}
          onClick={() => {
            deleteTodo(todo.id);
            navigate(`/todos/${location.search}`);
          }}
        >
          <i className="fas fa-times"> </i>{" "}
        </section>

        <section className="flex flex-col">
          <input
            type="text"
            placeholder="New Title..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                editTodo(todo.id, e.target.value);
                setInputDisplay(false);
                navigate(`/todos/${location.search}`);
              }
            }}
            className={`p-1 w-28 sm:w-fit text-xs sm:text-sm rounded-sm outline-none mb-0.5 ${
              !InputDisplay && "hidden"
            }`}
            style={{
              backgroundColor: DARK,
              letterSpacing: ".04rem",
              animation: "opacity .3s",
            }}
          />
          <small
            className={`${!InputDisplay && "hidden"} text-gray-400 text-xs`}
          >
            Press Enter to edit todo
          </small>
        </section>

        <section
          className="flex p-2 rounded-full bg-yellow-600 sm:text-base text-sm"
          onClick={() => setInputDisplay(!InputDisplay)}
        >
          <i className="fas fa-pen"> </i>{" "}
        </section>
      </section>
    </section>
  );
};

export default Todo;
