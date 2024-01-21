import { api } from "../helper/api";
import { DAILY_SCHEDULE, WEEK_DAYS } from "../helper/constants";

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
    const schedules = JSON.parse(data.schedules).schedules
    const typeSchedule = data.type_schedule_id
    const schedulesList = (typeSchedule === DAILY_SCHEDULE)
                          ? schedules.reduce((schedules, reminder) => {
                              schedules[WEEK_DAYS[reminder.day - 1]] = reminder.hour_of_execution;
                              return schedules;
                            }, {})
                          : schedules;

    return {
      id: data.id,
      chatId: data.chat_id,
      message: data.message,
      typeScheduleId: data.type_schedule_id,
      schedules: schedulesList,
      settingId: data.setting_id
    };
  } catch (error) {
    throw new Error('Error fetching reminder: ' + error.message);
  }
}

export const deleteReminder = async (reminderId) => {
  try {
    const response = await api.delete(`/reminders/${reminderId}`);
    const { message } = response;

    return message;
  } catch (error) {
    throw new Error('Error deleting reminder: ' + error.message);
  }

}