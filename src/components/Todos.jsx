import Loader from "../assets/dots.gif";
import Todo from "./Todo";
import { getTodos, addTodo } from "../data/data";
import { BLUE } from "../helpers/colors";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Todos = ({ todosPage }) => {
  const todos = getTodos();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputDisplay, setInputDisplay] = useState(false);
  return (
    <>
      <main>
        <section className="py-6 px-4 sm:px-12">
          <section className="flex flex-col gap-y-4 ">
            <section
              className="flex flex-col gap-2 items-center sm:flex-row sm:justify-around"
              style={{ minHeight: "15vh" }}
            >
              <section className="flex flex-col items-center gap-3">
                <button
                  onClick={() => setInputDisplay(!inputDisplay)}
                  className="p-3 flex items-center gap-x-2 text-sm text-white rounded-sm"
                  style={{ backgroundColor: BLUE }}
                >
                  <i className="fas fa-plus"></i>
                  Add New Todo
                </button>
                <section className="flex flex-col">
                  <input
                    placeholder="Title..."
                    type="text"
                    className={`${
                      !inputDisplay && "hidden"
                    } text-white py-2 px-3 rounded-sm mb-0.5 outline-none text-sm`}
                    style={{
                      backgroundColor: BLUE,
                      letterSpacing: "0.04rem",
                      animation: "opacity .3s",
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addTodo(e.target.value);
                        setInputDisplay(false);
                        navigate(`/todos/${location.search}`);
                      }
                    }}
                  />
                  <small
                    className={`${!inputDisplay && "hidden"} text-gray-400`}
                  >
                    Press Enter to Create new todo
                  </small>
                </section>
              </section>
              <section>
                <input
                  type="text"
                  className="text-white py-2 px-3 rounded-sm outline-none text-sm"
                  style={{ backgroundColor: BLUE, letterSpacing: "0.04rem" }}
                  placeholder="Search Todos..."
                  onChange={(e) => {
                    const query = e.target.value;
                    if (query) {
                      setSearchParams({ filter: query });
                    } else {
                      setSearchParams({});
                    }
                  }}
                />
              </section>
            </section>
            <section className="flex flex-col gap-2 items-center">
              {todos.length > 0 ? (
                todos
                  .filter((todo) => {
                    const filter = searchParams.get("filter");
                    if (!filter) {
                      return true;
                    } else {
                      return todo.title
                        .toLowerCase()
                        .includes(filter.toLowerCase());
                    }
                  })
                  .map((todo) => {
                    if (!todo.done && todosPage) {
                      return (
                        <Todo key={todo.id} todo={todo} todosPage={todosPage} />
                      );
                    } else if (todo.done && !todosPage) {
                      return (
                        <Todo key={todo.id} todo={todo} todosPage={todosPage} />
                      );
                    }
                    return false;
                  })
              ) : (
                <img src={Loader} alt="LoadingDots" />
              )}
            </section>
          </section>
        </section>
      </main>
    </>
  );
};

export default Todos;
