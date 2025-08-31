import { commonAPI } from "./commonAPI"
import { serverURl } from "./serverURL"

// 1. add resume details to the server - POST - reqBody

export const addTodoAPI = async (reqBody)=>{
   return await commonAPI("post",`${serverURl}/todo`,reqBody)
}

export const getAllTodoAPI = async ()=>{
   return await commonAPI("get",`${serverURl}/todo`,"")
}

export const deleteTodoAPI = async (id) => {
  return await commonAPI("DELETE", `${serverURl}/todo/${id}`, "");
}

// api to get edit task data
export const getTodoByIdAPI = async (id) => {
  return await commonAPI("GET", `${serverURl}/todo/${id}`, "");
}


//api to update the edit task data
export const updateTodoAPI = async (id, reqBody) => {
  return await commonAPI("PUT", `${serverURl}/todo/${id}`, reqBody);
}