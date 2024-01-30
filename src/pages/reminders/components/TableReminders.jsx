import { useEffect, useState } from "react";
import { deleteReminder, getReminders } from "../../../api/reminders";
import { Thead } from "../../../components";
import { TableRowReminder } from "./TableRowReminder";
import { useNavigate } from "react-router-dom";
import { areYouSureAlert, successAlert } from "../../../helper";
import { useDispatch } from "react-redux";
import { onCloseLoader, onOpenLoader } from "../../../../store";

export const TableReminders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const headers = [
    'ID',
    'Chat ID',
    'Message',
    'Reminder Type',
    'Bot ID',
    'Actions'
  ];

  const [reminders, setReminders] = useState(null);

  useEffect(() => {
    dispatch( onOpenLoader() );

    getReminders().then(response => {
      setReminders(response);
      localStorage.setItem('storedReminders', JSON.stringify(response));
      dispatch( onCloseLoader() );
    })
    .catch(error => {
      console.log(error);
      sweetAlert('Error', 'Error getting reminders there was an network error, please try again later.', 'error');
    });
  }, [  ]);

  const onDelete = (reminderId) => {
    areYouSureAlert(() => {
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
