import { useNavigate } from "react-router-dom";
import { TableSettings } from "../components/index"
import { useTranslation } from "react-i18next"

export const SettingsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center m-10">
        <div className="text-left mr-10">
          <h1 className="text-2xl text-gray-800 text-center font-medium py-2">
            { t("setting_index_page.configurations") }
          </h1>
        </div>
        <div className="text-right">
          <a onClick={ () => navigate('/settings/new') }
             className="bg-blue-500 hover:bg-blue-600 text-white font-bold
                          py-2 px-4 rounded-full shadow-md transition duration-300
                          ease-in-out transform hover:scale-105">
            { t("setting_index_page.create_setting") }
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
