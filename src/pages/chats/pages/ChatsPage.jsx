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
    <div className="container mx-auto">
      <div className="flex justify-between items-center my-10 w-full">
        <div className="text-left">
          <h1 className="text-2xl text-gray-800 text-center font-medium">
            { t("chat_index_page.chat") }
          </h1>
        </div>

        <div className="text-right">
          <Button title={ t("chat_index_page.create_new_chat") } handleClick={ onNewChat } />
        </div>
      </div>

      <TableChats />
    </div>
  )
}
