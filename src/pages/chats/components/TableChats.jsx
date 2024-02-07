import { useEffect, useState } from "react";
import { TableData } from "../../../components";
import { useNavigate } from "react-router-dom";
import { areYouSureAlert, successAlert } from "../../../helper";
import { useDispatch } from "react-redux";
import { onCloseLoader, onOpenLoader } from "../../../../store";
import { useTranslation } from "react-i18next";
import { deleteChat, getAllChats } from "../../../api/chat";

export const TableChats = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [chats, setChats] = useState([]);

  useEffect(() => {
    dispatch( onOpenLoader() );

    getAllChats().then(response => {
      const newChatData = buildChatsData(response);
      setChats(newChatData);
      dispatch( onCloseLoader() );
    })
    .catch(error => {
      console.log(error);
      sweetAlert(t('error'), t('chat_index_page.error_getting_chats'), 'error');
    });
  }, [  ]);

  const onDelete = (chatId) => {
    areYouSureAlert(t('chat_index_page.title_modal_delete_chat'), t('chat_index_page.text_modal_delete_chat'), () => {
      deleteChat(chatId).then((_) => {
        const newChats = chats.filter(reminder => reminder.id !== chatId);
        setChats(newChats);

        successAlert(t('chat_index_page.chat_deleted'));
      }).catch((error) => {
        console.error(error);
        sweetAlert(t('chat_index_page.error'), t('chat_index_page.error_deleting_chat'), 'error');
      });;
    })
  };

  const onEdit = (reminderId) => {
    navigate(`/chats/edit/${reminderId}`);
  }

  const buildChatsData = (chatsData) => {
    return chatsData.map((chat) => (
      {
        'id': chat.id,
        'name': chat.name,
        'description': chat.description,
        'chat_id': chat.chat_id
      }
    ))
  }

  return (
    <TableData translation_block={ 'chat_index_page' } data={ chats } onDelete={ onDelete } onUpdate={ onEdit }/>
  )
}
