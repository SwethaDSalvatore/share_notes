import { React, useState, Fragment } from "react";

const Edit = ({ todo }) => {
  const [note, setNote] = useState(todo.note);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setNote(todo.note);
  };

  //edit note function
  const updateNote = async (e) => {
    e.preventDefault();
    try {
      const body = { note };
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <button
        type="button"
        onClick={openModal}
        className="block text-center"
        data-target={`#id${todo.todo_id}`}
      >
        {/* edit button */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className="fill-current text-yellow-600 hover:text-yellow-500 w-7 h-7"
        >
          <path
            fill="currentColor"
            d="M10 7h7q.425 0 .713.288T18 8t-.288.713T17 9h-7q-.425 0-.712-.288T9 8t.288-.712T10 7m0 3h7q.425 0 .713.288T18 11t-.288.713T17 12h-7q-.425 0-.712-.288T9 11t.288-.712T10 10m2 10H5zm-6 2q-1.25 0-2.125-.875T3 19v-2q0-.425.288-.712T4 16h2V4q0-.825.588-1.412T8 2h11q.825 0 1.413.588T21 4v6q0 .425-.288.713T20 11t-.712-.288T19 10V4H8v12h3q.425 0 .713.288T12 17t-.288.713T11 18H5v1q0 .425.288.713T6 20h5q.425 0 .713.288T12 21t-.288.713T11 22zm8-1v-1.65q0-.2.075-.387t.225-.338l5.225-5.2q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.2 5.2q-.15.15-.337.225T16.65 22H15q-.425 0-.712-.287T14 21m7.5-5.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zm3.525-3.525l-.475-.45l.925.925z"
          ></path>
        </svg>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed left-0 top-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50"
          id={`id${todo.todo_id}`}
          onClick={() => setDescription(todo.note)}
        >
          <div className="bg-zinc-800 rounded-lg shadow max-w-md w-full p-4 md:p-5">
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between p-4 border-b border-yellow-200">
                <h5 className="text-xl font-semibold text-yellow-600">Edit</h5>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 hover:text-red-600 bg-transparent focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                {/* Modal body */}
                <input
                  type="text"
                  className="bg-zinc-700 border text-white text-sm rounded-lg block w-full p-2.5 outline-none"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              {/* confirm button */}
              <div className="flex space-x-5 items-center justify-end p-4 border-t border-yellow-200">
                <button
                  type="button"
                  onClick={(e) => updateNote(e)}
                  className="text-white bg-yellow-600 hover:bg-yellow-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Save changes
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-white bg-red-600 hover:bg-red-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Edit;
