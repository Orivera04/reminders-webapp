import { TableSettings } from "../components/index"

export const SettingsPage = () => {
  return (
    <>
      <div className="flex justify-between items-center m-10">
        <div className="text-left mr-10">
          <h1 className="text-2xl text-gray-800 text-center font-medium py-2">Configuraciones</h1>
        </div>
        <div className="text-right">
          <a href="/settings/new"
             className="bg-blue-500 hover:bg-blue-600 text-white font-bold
                          py-2 px-4 rounded-full shadow-md transition duration-300
                          ease-in-out transform hover:scale-105">
            Create Setting
          </a>
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
