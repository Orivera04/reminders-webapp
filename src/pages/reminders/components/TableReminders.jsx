import { useEffect, useState } from "react";
import { deleteReminder, getReminders } from "../../../api/reminders";
import { Thead } from "../../../components";
import { TableRowReminder } from "./TableRowReminder";
import { useNavigate } from "react-router-dom";
import { deleteAlert } from "../../../helper";

export const TableReminders = () => {
  const navigate = useNavigate();

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
    const storedReminders = null;
    // JSON.parse(localStorage.getItem('storedReminders'))

    if (storedReminders === null) {
      getReminders().then(response => {
        setReminders(response);
        localStorage.setItem('storedReminders', JSON.stringify(response));
      })
      .catch(error => {
        console.log(error);
        sweetAlert('Error', 'Error getting reminders there was an network error, please try again later.', 'error');
      });
    }
    else {
      setReminders(storedReminders);
    }
  }, [  ]);

  const onDelete = (reminderId) => {
    deleteAlert(async () => {
      deleteReminder(reminderId)
      .then(_ => {
        const newReminders = reminders.filter(reminder => reminder.id !== reminderId);
        setReminders(newReminders);

        localStorage.setItem('storedReminders', JSON.stringify(newReminders));
        sweetAlert('Success', 'Reminder deleted successfully', 'success');
      })
      .catch(error => {
        console.log(error);
        sweetAlert('Error', 'Error deleting reminder there was an network error, please try again later.', 'error');
      });
    });
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
