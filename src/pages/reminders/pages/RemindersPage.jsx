import { useNavigate } from "react-router-dom";
import { Button } from "../../settings/components"
import { TableReminders } from "../components"
import { useTranslation } from "react-i18next";

export const RemindersPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onNewReminder = () => {
    navigate("/reminders/new");
  };

  return (
    <>
      <div className="flex justify-between items-center m-10">
        <div className="text-left mr-10">
          <h1 className="text-2xl text-gray-800 text-center font-medium py-2">{ t("reminder_index_page.reminders") }</h1>
        </div>
        <div className="text-right">
          <Button title={ t("reminder_index_page.create_reminder")  } handleClick={ onNewReminder } />
        </div>
      </div>

      <div className="m-10">
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden mt-5">
          <TableReminders />
        </div>
      </div>

    </>
  )
}
