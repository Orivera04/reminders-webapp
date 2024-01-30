import { api } from "../helper/api";

export const getReminders = async () => {
  try {
    const response = await api.get('/reminders');
    const { data: { data: remindersList } } = response;

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

export const getReminderById = async (reminderId) => {
  try {
    const response = await api.get(`/reminders/${reminderId}`);
    const { data } = response;

    return {
      id: data.id,
      chatId: data.chat_id,
      message: data.message,
      typeScheduleId: data.type_schedule_id,
      schedules: data.schedules,
      settingId: data.setting_id
    };
  } catch (error) {
    throw new Error('Error fetching reminder: ' + error.message);
  }
}

export const createReminder = async (reminder) => {
  try {

    const reminderObject = {
      chat_id: reminder.chatId,
      message: reminder.message,
      type_schedule_id: reminder.typeScheduleId,
      schedules: reminder.schedules,
      setting_id: reminder.settingIdSelected
    };

    const response = await api.post('/reminders', reminderObject);
    const { data: { message } } = response;

    return message;
  } catch (error) {
    throw new Error('Error fetching reminder: ' + error.message);
  }
}

export const updateReminder = async (reminder) => {
  try {
    const reminderObject = {
      chat_id: reminder.chatId,
      message: reminder.message,
      type_schedule_id: reminder.typeScheduleId,
      schedules: reminder.schedules,
      setting_id: reminder.settingIdSelected
    };

    const response = await api.put(`/reminders/${reminder.id}`, reminderObject);
    const { data: { message } } = response;

    return message;
  } catch (error) {
    throw new Error('Error updating reminder: ' + error.message);
  }

}

export const deleteReminder = async (reminderId) => {
  try {
    const response = await api.delete(`/reminders/${reminderId}`);
    const { data } = response;

    return data.message;
  } catch (error) {
    throw new Error('Error deleting reminder: ' + error.message);
  }

}

export const sendReminder = async (reminderId) => {
  try {

    const reminderObject = {
      reminder_id: reminderId
    };

    const response = await api.post('/telegram_triggers', reminderObject);
    const { data: { message } } = response;

    return message;
  } catch (error) {
    throw new Error('Error fetching reminder: ' + error.message);
  }
}
