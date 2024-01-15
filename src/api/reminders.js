import { api } from "../helper/api";

export const getReminders = async () => {
  try {
    const response = await api.get('/reminders');
    const { data: { data: remindersList } } = response;

    debugger;
    return remindersList.map(reminder => ({
      id: reminder.attributes.id,
      message: reminder.attributes.message,
      chatID: reminder.attributes.chat_id,
      typeSchedule: reminder.attributes.type_schedule,
      reminderType: reminder.attributes.type_schedule,
      botName: reminder.attributes.setting_name,
    }));

  } catch (error) {
    throw new Error('Error fetching reminders: ' + error.message);
  }
};
