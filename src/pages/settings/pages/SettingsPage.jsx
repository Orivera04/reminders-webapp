import { Button, TableSettings } from "../components/index"

export const SettingsPage = () => {
  return (
    <>
      <div class="flex justify-between items-center m-10">
        <div class="text-left mr-10">
          <h1 class="text-2xl text-gray-800 text-center font-medium py-2">Settings</h1>
        </div>
        <div class="text-right">
          <Button title='Create Setting' />
        </div>
      </div>

      <div className="m-10">
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden mt-5">
          <TableSettings />
        </div>
      </div>

    </>
  )
}
