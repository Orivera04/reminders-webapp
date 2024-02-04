import { createChat, deleteChat, getAllChats, getChatById, updateChat } from "../../src/api/chat";
import { api } from "../../src/helper";
import { mockChat, mockDefaultChats } from "../fixtures/chatFixture";

jest.mock('../../src/helper/api');

describe('chat', () => {

  jest.clearAllMocks();

  it('should get all chats', async () => {
    api.get.mockResolvedValue({ data: mockDefaultChats });

    const chatLists = await getAllChats();

    expect(chatLists).toEqual(mockDefaultChats);

  });

  it('should get a chat by id', async () => {
    api.get.mockResolvedValue({ data: mockChat });

    const chatLists = await getChatById(1);

    expect(chatLists).toEqual(mockChat);
  });

  it('should create a chat', async () => {
    api.post.mockResolvedValue({ data: { ok: true } });

    const response = await createChat(mockChat);

    expect(response).toEqual({ ok: true });
  });

  it('should update a chat', async () => {
    api.put.mockResolvedValue({ data: { ok: true } });

    const response = await updateChat(1, mockChat);

    expect(response).toEqual({ ok: true });
  });

  it('should delete a chat', async () => {
    api.delete.mockResolvedValue({ data: { ok: true, message: 'Chat Deleted.' } });

    const response = await deleteChat(1);

    expect(response).toEqual('Chat Deleted.');
  });

  it('should throw an error when get all chats fails', async () => {
    api.get.mockRejectedValue(new Error('Failed to fetch'));

    try {
      await getAllChats();
    } catch (error) {
      expect(error).toEqual(new Error('Error: Failed to fetch'));
    }
  });

  it('should throw an error when get chat by id fails', async () => {
    api.get.mockRejectedValue(new Error('Failed to fetch'));

    try {
      await getChatById(1);
    } catch (error) {
      expect(error).toEqual(new Error('Error: Failed to fetch'));
    }
  });

  it('should throw an error when create chat fails', async () => {
    api.post.mockRejectedValue(new Error('Failed to create'));

    try {
      await createChat(mockChat);
    } catch (error) {
      expect(error).toEqual(new Error('Error: Failed to create'));
    }
  });

  it('should throw an error when update chat fails', async () => {
    api.put.mockRejectedValue(new Error('Failed to update'));

    try {
      await updateChat(1, mockChat);
    } catch (error) {
      expect(error).toEqual(new Error('Error: Failed to update'));
    }
  });

  it('should throw an error when delete chat fails', async () => {
    api.delete.mockRejectedValue(new Error('Failed to delete'));

    try {
      await deleteChat(1);
    } catch (error) {
      expect(error).toEqual(new Error('Error: Failed to delete'));
    }
  });
});
