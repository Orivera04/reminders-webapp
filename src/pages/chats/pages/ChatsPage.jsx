import { useNavigate } from "react-router-dom";
import { Button } from "../../settings/components"
import { TableChats } from "../components/"
import { useTranslation } from "react-i18next";

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

      <div className="m-10">
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden mt-5">
          <TableChats />
        </div>
      </div>

    </>
  )
}
