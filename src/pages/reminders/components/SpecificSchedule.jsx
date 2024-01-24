import React from 'react'

export const SpecificSchedule = ({ handleScheduleChange, schedules }) => {
  return (
    <div className="flex-1 max-w-2xl p-6 bg-white rounded-md shadow w-4/5">
      <h2 className="text-2xl font-bold mb-4">Specific Schedule</h2>

      <div className="mb-4">
        <label htmlFor="chatId" className="block text-gray-700 text-sm font-bold mb-2">
          Day of the month
        </label>
        <input
          type="text"
          id="dayOfMonth"
          name="day_of_month"
          value={ schedules.day_of_month }
          onChange={ handleScheduleChange }
          className="w-full p-2 border rounded-md"
          placeholder="Enter the day of the month that you want to send the reminder"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Execution Hour</label>
        <input
          type="time"
          className="w-full p-2 border rounded-md"
          name="hour_of_execution"
          value={ schedules.hour_of_execution }
          onChange={ handleScheduleChange }
        />
      </div>
    </div>
  )
}