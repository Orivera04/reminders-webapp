
export const DailySchedules = ({ handleScheduleChange, schedules }) => {

  return (
    <div className="flex-1 max-w-2xl p-6 bg-white rounded-md shadow w-4/5">
      <h2 className="text-2xl font-bold mb-4">Daily Schedules</h2>

      { Object.entries(schedules).map(([day, executionTime]) => (
        <div key={ day } className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">{ day }</label>
          <input
            type="time"
            name={ day }
            value={ executionTime }
            onChange={ handleScheduleChange }
            className="w-full p-2 border rounded-md"
          />
        </div>
      ))}
    </div>
  )
}
