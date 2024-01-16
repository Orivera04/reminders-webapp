import { useEffect, useState } from "react";
import { deleteReminder, getReminders } from "../../../api/reminders";
import { Thead } from "../../../components";
import { TableRowReminder } from "./TableRowReminder";

export const TableReminders = () => {
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
    const storedReminders = JSON.parse(localStorage.getItem('storedReminders'));

    if (storedReminders === null) {
      getReminders()
      .then(response => {
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
    deleteReminder(reminderId)
    .then(response => {
      const newReminders = reminders.filter(reminder => reminder.id !== reminderId);
      setReminders(newReminders);

      localStorage.setItem('storedReminders', JSON.stringify(newReminders));
      sweetAlert('Success', 'Reminder deleted successfully', 'success');
    })
    .catch(error => {
      console.log(error);
      sweetAlert('Error', 'Error deleting reminder there was an network error, please try again later.', 'error');
    });
  };

  const onEdit = () => {
    alert('edit');
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
