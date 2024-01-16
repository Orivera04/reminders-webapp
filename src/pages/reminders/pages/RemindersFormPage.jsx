import React, { useState } from 'react'

export const RemindersFormPage = () => {

  const [schedules, setSchedules] = useState({
    monday: '00:00',
    tuesday: '00:00',
    wednesday: '00:00',
    thursday: '00:00',
    friday: '00:00',
    saturday: '00:00',
    sunday: '00:00'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={ handleSubmit }>
      <div className='flex justify-center m-5'>
        <div className="flex-1 max-w-2xl p-6 bg-white rounded-md shadow w-4/5 mr-10">
            <h2 className="text-2xl font-bold mb-4">Create new reminder</h2>
            <div className="mb-4">
                <label htmlFor="chatId" className="block text-gray-700 text-sm font-bold mb-2">
                  Chat ID
                </label>
                <input
                  type="text"
                  id="chatId"
                  name="chatId"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your group chat ID"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full p-2 border rounded-md"
                  rows="4"
                  placeholder="Enter your message..."
                />
              </div>

              <div className="mb-4">
                <label htmlFor="typeScheduleId" className="block text-gray-700 text-sm font-bold mb-2">
                  Type Schedule
                </label>
                <select
                  id="typeScheduleId"
                  name="format"
                  className="w-full p-2 border rounded-md"
                >
                  <option value="1">Daily</option>
                  <option value="2">Specific</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="typeScheduleId" className="block text-gray-700 text-sm font-bold mb-2">
                  Setting
                </label>
                <select
                  id="SettingID"
                  name="format"
                  className="w-full p-2 border rounded-md"
                >
                  <option value="1">YubeRecordatoriosBot</option>
                  <option value="2">RecordatorioPagoBot</option>
                </select>
              </div>
        </div>

        <div className="flex-1 max-w-2xl p-6 bg-white rounded-md shadow w-4/5">
          <h2 className="text-2xl font-bold mb-4">Schedules</h2>

          { Object.entries(schedules).map(([day, executionTime]) => (
            <div key={day} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">{day}</label>
              <input
                type="time"
                value={executionTime}
                onChange={(e) => handleHourChange(day, e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-center'>
        <button type='submit' className='flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-20 mb-1'>Submit</button>
      </div>
    </form>
  );
}
