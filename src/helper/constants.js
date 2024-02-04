
export const DAILY_SCHEDULE = 1;

export const SPECIFIC_SCHEDULE = 2;

export const DEFAULT_DAILY_SCHEDULES = {
  monday: '00:00',
  tuesday: '00:00',
  wednesday: '00:00',
  thursday: '00:00',
  friday: '00:00',
  saturday: '00:00',
  sunday: '00:00'
};

export const DEFAULT_SPECIFIC_SCHEDULE = {
  day_of_month: '1',
  hour_of_execution: '00:00'
};

export const WEEK_DAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
];

export const SETTING_DEFAULT_FIELDS = {
  token_bot_api: '',
  formatting_style_id: '',
  description: ''
}

export const FORMATTING_STYLES = {
  1: {
    'content': 'Markdown',
    'color': 'green'
  },
  2: {
    'content': 'HTML',
    'color': 'blue'
  }
};
