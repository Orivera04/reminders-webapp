import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"
import { TableSettings } from "../components"

export const SettingsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center my-10 w-full">

        <div className="text-left">
          <h1 className="text-2xl text-gray-800 text-center font-medium">
            { t("setting_index_page.configurations") }
          </h1>
        </div>

        <div className="text-right">
          <a onClick={ () => navigate('/settings/new') }
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold
                        py-2 px-4 rounded-full shadow-md transition duration-300
                        ease-in-out transform hover:scale-105"
                        data-testid='create-setting'>
            { t("setting_index_page.create_setting") }
          </a>
        </div>
      </div>

      <TableSettings />
    </div>
  )
}
