import { useTranslation } from "react-i18next";

export const DailySchedules = ({ handleScheduleChange, schedules }) => {

  const { t } = useTranslation();

  return (
    <div className="flex-1 max-w-2xl p-6 bg-white rounded-md shadow m-0 mb-5 sm:m-5 sm:ml-2">
      <h2 className="text-2xl font-bold mb-4">{ t('reminder_form_page.daily_schedules') }</h2>

      { Object.entries(schedules).map(([day, executionTime]) => (
        <div key={ day } className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">{  t(`reminder_form_page.weekdays.${day}`) }</label>
          <input
            type="time"
            name={ day }
            value={ executionTime }
            onChange={ handleScheduleChange }
            className="w-full p-2 border rounded-md appearance-none bg-white"
          />
        </div>
      ))}
    </div>
  )
}
