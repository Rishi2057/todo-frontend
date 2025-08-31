import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import {
  deleteTodoAPI,
  getAllTodoAPI,
  getTodoByIdAPI,
  updateTodoAPI,
} from "../services/allApi";

function Todo({ refresh }) {
  const [item, setItem] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({ id: null, todo: "" });

  const todo = async () => {
    try {
      const result = await getAllTodoAPI();
      setItem(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodoAPI(id);
      todo();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditOpen = async (id) => {
    try {
      const result = await getTodoByIdAPI(id);
      setEditData({ id: result.data.id, todo: result.data.todo });
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSave = async () => {
    try {
      await updateTodoAPI(editData.id, { todo: editData.todo });
      setIsModalOpen(false);
      todo();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    todo();
  }, [refresh]);

  return (
    <div className="bg-white rounded-lg shadow-md w-full min-h-fit px-4 py-6">
      {item?.length > 0 ? (
        item.map((pro) => (
          <div
            key={pro.id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-md mb-3 shadow-sm"
          >
            <h1 className="flex items-center gap-3 text-gray-800 text-sm sm:text-base">
              <FaCheck className="text-green-600" /> {pro.todo}
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditOpen(pro.id)}
                className="bg-blue-500 px-3 py-1 rounded text-white text-sm"
              >
                <CiEdit />
              </button>
              <button
                onClick={() => handleDelete(pro.id)}
                className="bg-red-500 px-3 py-1 rounded text-white text-sm"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-center text-gray-600">No ToDo added</h1>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-trasparent bg-opacity-50 px-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Edit Task</h2>
            <input
              type="text"
              value={editData.todo}
              onChange={(e) =>
                setEditData({ ...editData, todo: e.target.value })
              }
              className="w-full border px-3 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Todo;
