
export const clearRemindersStorage = () => {
  localStorage.removeItem('storedReminders');
}

export const clearSettingsStorage = () => {
  localStorage.removeItem('storedSettings');
}
