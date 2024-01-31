import { api } from "../helper";

export const getAllChats = async () => {
  try {
    const { data } = await api.get('/chats');

    return data;
  } catch(error) {
    throw new Error('Error: ' + error.message);
  }
}

export const getChat = async (id) => {
  try {
    const { data } = await api.get(`/chats/${id}`);

    return data;
  } catch(error) {
    throw new Error('Error: ' + error.message);
  }
}

export const createChat = async (chatData) => {
  try {
    const { data } = await api.post('/chats', chatData);

    return data;
  } catch(error) {
    throw new Error('Error: ' + error.message);
  }
}

export const updateChat = async (id, chatData) => {
  try {
    const { data } = await api.put(`/chats/${id}`, chatData);

    return data;
  } catch(error) {
    throw new Error('Error: ' + error.message);
  }
}

export const deleteChat = async (id) => {
  try {
    const { data } = await api.delete(`/chats/${id}`);

    return data.message
  } catch(error) {
    throw new Error('Error: ' + error.message);
  }
}