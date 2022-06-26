import { BLUE, DARKBLUE, PINK } from "../helpers/colors";

const Navbar = ({ todosPage, setTodosPage }) => {
  return (
    <header>
      <section>
        <section
          className="w-full flex justify-center shadow-xl  items-center p-5  "
          style={{ color: PINK, backgroundColor: DARKBLUE }}
        >
          <p>React Todo App</p>
        </section>
        <section
          style={{ backgroundColor: BLUE }}
          className="text-white  divide-white    p-5 flex  items-center   justify-evenly  "
        >
          <section
            onClick={() => setTodosPage(true)}
            className={`${
              todosPage && "border-b"
            } cursor-pointer w-50 flex items-center justify-center`}
          >
            Todos
          </section>
          <section
            onClick={() => setTodosPage(false)}
            className={`${
              !todosPage && "border-b"
            } cursor-pointer  w-50 flex items-center justify-center`}
          >
            Done
          </section>
        </section>
      </section>
    </header>
  );
};
export default Navbar;
