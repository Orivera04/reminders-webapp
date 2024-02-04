import { useEffect, useState } from "react";
import { deleteReminder, getReminders } from "../../../api/reminders";
import { useNavigate } from "react-router-dom";
import { areYouSureAlert, successAlert } from "../../../helper";
import { useDispatch } from "react-redux";
import { onCloseLoader, onOpenLoader } from "../../../../store";
import { useTranslation } from "react-i18next";
import { TableData } from "../../../components";

export const TableReminders = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    dispatch( onOpenLoader() );

    getReminders().then(response => {
      const newReminderData = buildChatsData(response);
      setReminders(newReminderData);
      dispatch( onCloseLoader() );
    })
    .catch(error => {
      console.log(error);
      sweetAlert(t('error'), t('reminder_index_page.error_getting_reminders'), 'error');
    });
  }, [  ]);

  const onDelete = (reminderId) => {
    areYouSureAlert(t('reminder_index_page.title_modal_delete_reminder'), t('reminder_index_page.text_modal_delete_reminder'), () => {
      deleteReminder(reminderId).then((message) => {
        const newReminders = reminders.filter(reminder => reminder.id !== reminderId);
        setReminders(newReminders);

        successAlert(t('reminder_index_page.deleted_reminder'));
      });
    })
  };

  const onEdit = (reminderId) => {
    navigate(`/reminders/edit/${reminderId}`);
  }

  const buildChatsData = (remindersData) => {
    return remindersData.map((reminder) => (
      {
        'id': reminder.id,
        'message': reminder.message,
        'reminder_type': reminder.reminderType,
        'bot_id': reminder.botName,
        'chat_name': reminder.chatName
      }
    ))
  }

  return (
    <TableData translation_block={ 'reminder_index_page' } data={ reminders } onDelete={ onDelete } onUpdate={ onEdit }/>
  )
}
