import { DAILY_SCHEDULE, DEFAULT_DAILY_SCHEDULES, DEFAULT_SPECIFIC_SCHEDULE, SETTING_DEFAULT_FIELDS, SPECIFIC_SCHEDULE, WEEK_DAYS } from "../../src/helper";

describe('constants', () => {
  test('Check if daily schedule constant is defined', () => {
    expect(DAILY_SCHEDULE).toBeDefined();
    expect(DAILY_SCHEDULE).toEqual(1);
  });

  test('Check if specific schedule constant is defined', () => {
    expect(SPECIFIC_SCHEDULE).toBeDefined();
    expect(SPECIFIC_SCHEDULE).toEqual(2);
  });

  test('Check if default daily schedules are defined correctly', () => {
    expect(DEFAULT_DAILY_SCHEDULES).toEqual({
      monday: '00:00',
      tuesday: '00:00',
      wednesday: '00:00',
      thursday: '00:00',
      friday: '00:00',
      saturday: '00:00',
      sunday: '00:00'
    });
  });

  test('Check if default specific schedule is defined correctly', () => {
    expect(DEFAULT_SPECIFIC_SCHEDULE).toEqual({
      day_of_month: '1',
      hour_of_execution: '00:00'
    });
  });

  test('Check if week days array is defined and contains correct days', () => {
    expect(WEEK_DAYS).toBeDefined();
    expect(WEEK_DAYS).toEqual([
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday'
    ]);
  });

  test('Check if setting default fields are defined correctly', () => {
    expect(SETTING_DEFAULT_FIELDS).toEqual({
      token_bot_api: '',
      formatting_style_id: '',
      description: ''
    });
  });
});