import { TableReminders } from "../components"

export const RemindersPage = () => {
  return (
    <>
      <div className="flex justify-between items-center m-10">
        <div className="text-left mr-10">
          <h1 className="text-2xl text-gray-800 text-center font-medium py-2">Reminders</h1>
        </div>
        <div className="text-right">
          <button title='Create reminders' />
        </div>
      </div>

      <div className="m-10">
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden mt-5">
          <TableReminders />
        </div>
      </div>

    </>
  )
}
