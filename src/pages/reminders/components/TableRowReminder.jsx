import { useTranslation } from "react-i18next";
import { ActionSection } from "../../../components"

export const TableRowReminder = ({ id, chatName, message, reminderType, BotName, handleDelete, handleUpdate }) => {

  const { t } = useTranslation();
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { id }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { chatName }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { message }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { t(`reminder_index_page.${reminderType.toLowerCase()}`) }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { BotName }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <ActionSection id={ id }
          onDelete={ handleDelete }
          onUpdate={ handleUpdate } />
      </td>
    </tr>
  )
}
