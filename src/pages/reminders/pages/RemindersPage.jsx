  import { useNavigate } from "react-router-dom";
  import { Button } from "../../../components"
  import { TableReminders } from "../components"
  import { useTranslation } from "react-i18next";

  export const RemindersPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const onNewReminder = () => {
      navigate("/reminders/new");
    };

    return (
      <div className="container mx-auto">
        <div className="flex justify-between items-center my-10 w-full">

          <div className="text-left">
            <h1 className="text-2xl text-gray-800 text-center font-medium">
              { t("reminder_index_page.reminders") }
            </h1>
          </div>
          <div className="text-right">
            <Button title={ t("reminder_index_page.create_reminder")  } handleClick={ onNewReminder } />
          </div>
        </div>

        <TableReminders />
      </div>
    )
  }
