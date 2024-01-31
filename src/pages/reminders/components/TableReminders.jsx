import { useEffect, useState } from "react";
import { deleteReminder, getReminders } from "../../../api/reminders";
import { Thead } from "../../../components";
import { TableRowReminder } from "./TableRowReminder";
import { useNavigate } from "react-router-dom";
import { areYouSureAlert, successAlert } from "../../../helper";
import { useDispatch } from "react-redux";
import { onCloseLoader, onOpenLoader } from "../../../../store";
import { useTranslation } from "react-i18next";

export const TableReminders = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const headers = [
    t('reminder_index_page.id'),
    t('reminder_index_page.chat_id'),
    t('reminder_index_page.message'),
    t('reminder_index_page.reminder_type'),
    t('reminder_index_page.bot_id'),
    t('reminder_index_page.actions')
  ];

  const [reminders, setReminders] = useState(null);

  useEffect(() => {
    dispatch( onOpenLoader() );

    getReminders().then(response => {
      setReminders(response);
      dispatch( onCloseLoader() );
    })
    .catch(error => {
      console.log(error);
      sweetAlert(t('error'), t('reminder_index_page.error_getting_reminders'), 'error');
    });
  }, [  ]);

  const onDelete = (reminderId) => {
    areYouSureAlert(t('reminder_index_page.title_modal_delete_reminder'), t('reminder_index_page.text_modal_delete_reminder') ,() => {
      deleteReminder(reminderId).then((message) => {
        const newReminders = reminders.filter(reminder => reminder.id !== reminderId);
        setReminders(newReminders);

        successAlert(message);
      });
    })
  };

  const onEdit = (reminderId) => {
    navigate(`/reminders/edit/${reminderId}`);
  }

  return (
    <table className="min-w-full leading-normal">
      <Thead headers={ headers } />

      <tbody>
        {
          reminders && reminders.map((reminder, _) => (
            <TableRowReminder key={ reminder.id } id={ reminder.id } chatID={ reminder.chatID }
              message={ reminder.message } reminderType={ reminder.reminderType }
              BotName={ reminder.botName } handleDelete= { onDelete } handleUpdate= { onEdit } />
          ))
        }
      </tbody>
    </table>
  )
}
