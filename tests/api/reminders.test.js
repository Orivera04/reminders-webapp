import {
  getReminders,
  getReminderById,
  createReminder,
  updateReminder,
  deleteReminder,
  sendReminder
} from "../../src/api/reminders";
import { api } from "../../src/helper/api";
import { mockReminders, mockReminder } from "../fixtures/reminderFixture";

jest.mock('../../src/helper/api');

describe("Reminder API Functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get reminders", async () => {
    api.get.mockResolvedValue({ data: { data: mockReminders }});

    const reminders = await getReminders();
    expect(reminders).toEqual([
      {
        id: 'uJpI29',
        message: '**Usuario** son las 1 PM, bebe 1 vaso con agua, para que tengas 5 en total bebidos',
        chatID: 'wQlH83',
        typeSchedule: 'Daily',
        reminderType: 'Daily',
        botName: 'Recordatorios Bot',
        chatName: 'Recordatorios'
      },
      {
        id: 'mKoT57',
        message: '**Usuario** son las 12PM, bebe 1 vaso con agua, para que tengas 4 en total bebidos',
        chatID: 'vReS61',
        typeSchedule: 'Daily',
        reminderType: 'Daily',
        botName: 'Recordatorios Bot',
        chatName: 'Recordatorios'
      }
    ]);
  });

  it("should get a reminder by id", async () => {
    const reminderId = 1;
    api.get.mockResolvedValue({ data: mockReminder });
    const reminder = await getReminderById(reminderId);

    expect(reminder).toEqual(
      {
        id: 'uJpI29',
        chatId: 'wQlH83',
        message: '**Usuario** son las 1 PM, bebe 1 vaso con agua, para que tengas 5 en total bebidos',
        typeScheduleId: 1,
        schedules: {
          monday: '10:00',
          tuesday: '10:00',
          wednesday: '10:00',
          thursday: '10:00',
          friday: '10:00',
          saturday: '10:00',
          sunday: '10:00'
        },
        settingId: 1
      }
    );
  });

  it("should create a reminder", async () => {
    api.post.mockResolvedValue({ data: { message: "Reminder created successfully" } });
    const message = await createReminder(mockReminder);
    expect(message).toEqual("Reminder created successfully");
  });

  it("should update a reminder", async () => {
    api.put.mockResolvedValue({ data: { message: "Reminder updated successfully" } });
    const message = await updateReminder(mockReminder);
    expect(message).toEqual("Reminder updated successfully");
  });

  it("should delete a reminder", async () => {
    const reminderId = 1;
    api.delete.mockResolvedValue({ data: { message: "Reminder deleted successfully" } });
    const message = await deleteReminder(reminderId);
    expect(message).toEqual("Reminder deleted successfully");
  });

  it("should send a reminder", async () => {
    const reminderId = 1;
    api.post.mockResolvedValue({ data: { message: "Reminder sent successfully" } });
    const message = await sendReminder(reminderId);
    expect(message).toEqual("Reminder sent successfully");
  });
});
