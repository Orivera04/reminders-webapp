import { api } from "../helper";

export const getAllChats = async () => {
  try {
    const { data } = await api.get('/chats');

    return data;
  } catch(error) {
    throw new Error('Error: ' + error.message);
  }
}

export const getChatById = async (id) => {
  try {
    const { data } = await api.get(`/chats/${id}`);

    return data;
  } catch(error) {
    throw new Error('Error: ' + error.message);
  }
}

export const createChat = async (chat) => {
  try {

    const chatObject = {
      name: chat.chatId,
      description: chat.description,
      setting_id: chat.settingId,
      chat_id: chat.chatId,
    };

    const { data } = await api.post('/chats', chatObject);

    return data;
  } catch(error) {
    throw new Error('Error: ' + error.message);
  }
}

export const updateChat = async (id, chat) => {
  try {

    const chatObject = {
      name: chat.name,
      description: chat.description,
      setting_id: chat.settingId,
      chat_id: chat.chatId,
    };

    const { data } = await api.put(`/chats/${id}`, chatObject);

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