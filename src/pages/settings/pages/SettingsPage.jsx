import { Button } from "../components/Button"
import { TableSettings } from "../components/TableSettings"

export const SettingsPage = () => {
  return (
    <>
      <div class="flex justify-between items-center m-10">
        <div class="text-left mr-10">
          <h1 class="text-2xl text-gray-800 text-center font-medium py-2">Configuraciones</h1>
        </div>
        <div class="text-right">
          <Button title='Crear configuración' />
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
