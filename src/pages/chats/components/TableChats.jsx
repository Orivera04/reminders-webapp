import { useEffect, useState } from "react";
import { Thead } from "../../../components";
import { useNavigate } from "react-router-dom";
import { areYouSureAlert, successAlert } from "../../../helper";
import { useDispatch } from "react-redux";
import { onCloseLoader, onOpenLoader } from "../../../../store";
import { useTranslation } from "react-i18next";
import { deleteChat, getAllChats } from "../../../api/chat";
import { TableRowChat } from "./TableRowChat";

export const TableChats = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const headers = [
    t('chat_index_page.id'),
    t('chat_index_page.name'),
    t('chat_index_page.description'),
    t('chat_index_page.chat_id'),
    t('chat_index_page.actions')
  ];

  const [chats, setChats] = useState(null);

  useEffect(() => {
    dispatch( onOpenLoader() );

    getAllChats().then(response => {
      setChats(response);
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

  return (
    <table className="min-w-full leading-normal">
      <Thead headers={ headers } />

      <tbody>
        {
          chats && chats.map((chat, _) => (
            <TableRowChat key={ chat.id } id={ chat.id } name={ chat.name }
                          description={ chat.description } chatId={ chat.chat_id }
                          handleDelete= { onDelete } handleUpdate= { onEdit } />
          ))
        }
      </tbody>
    </table>
  )
}
