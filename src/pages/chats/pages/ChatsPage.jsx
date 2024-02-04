import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from '../../../components'
import { TableChats } from "../components/"

export const ChatsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onNewChat = () => {
    navigate("/chats/new");
  };

  return (
    <>
      <div className="flex justify-between items-center m-10">
        <div className="text-left mr-10">
          <h1 className="text-2xl text-gray-800 text-center font-medium py-2">{ t("chat_index_page.chat") }</h1>
        </div>

        <div className="text-right">
          <Button title={ t("chat_index_page.create_new_chat") } handleClick={ onNewChat } />
        </div>
      </div>

      <TableChats />
    </>
  )
}
