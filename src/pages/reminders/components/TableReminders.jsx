import { useEffect, useState } from "react";
import { getReminders } from "../../../api/reminders";
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
    if (reminders !== null) return;

    getReminders()
      .then(response => {
        setReminders(response);
      })
      .catch(error => {
        console.log(error);
        sweetAlert('Error', 'Error getting reminders there was an network error, please try again later.', 'error');
      })
  }, [  ]);

  return (
    <table className="min-w-full leading-normal">
      <Thead headers={ headers } />

      <tbody>
        {
          reminders && reminders.map((reminder, _) => (
            <TableRowReminder id={ reminder.id } chatID={ reminder.chatID } message={ reminder.message } reminderType={ reminder.reminderType } BotName={ reminder.botName } />
          ))
        }
      </tbody>
    </table>
  )
}
