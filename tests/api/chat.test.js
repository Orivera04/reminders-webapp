import axios from "axios";
import { getAllChats } from "../../src/api/chat";


describe('chat', () => {
  it('should get all chats', async () => {

    const mockData = [
      {
        id: 1,
        name: 'chat1',
        description: 'chat1 description',
        setting_id: 1,
        chat_id: 1
      },
      {
        id: 2,
        name: 'chat2',
        description: 'chat2 description',
        setting_id: 2,
        chat_id: 2
      }
    ];


    const chatLists = await getAllChats();

    expect(chatLists).toEqual(mockData);

  });
});
