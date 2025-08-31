import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import Todo from '../components/Todo';
import { addTodoAPI } from '../services/allApi';

function Landing() {
  const [task, setTask] = useState({ todo: "" });
  const [refresh, setRefresh] = useState(false);

  const addClick = async () => {
    try {
      const result = await addTodoAPI(task);
      console.log(result);
      setTask({ todo: "" });
      setRefresh(prev => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-300 min-h-screen pb-10 flex flex-col items-center">
      {/* Input Section */}
      <div className="w-full max-w-md mt-10 px-4">
        <div className="flex items-center">
          <input
            value={task.todo}
            onChange={(e) => setTask({ ...task, todo: e.target.value })}
            type="text"
            placeholder="Add your todo..."
            className="flex-1 bg-slate-50 outline-0 px-3 py-2 rounded-l-md border border-gray-300"
          />
          <button
            onClick={addClick}
            className="bg-slate-800 text-white px-4 py-2 rounded-r-md flex items-center justify-center"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Todo Section */}
      <div className="w-full max-w-2xl mt-10 px-4">
        <Todo refresh={refresh} />
      </div>
    </div>
  );
}

export default Landing;
