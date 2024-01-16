import { ActionSection } from "../../../components"

export const TableRowReminder = ({ id, chatID, message, reminderType, BotName, handleDelete, handleUpdate }) => {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { id }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { chatID }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { message }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { reminderType }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { BotName }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <ActionSection id={ id }
          handleDelete={ handleDelete }
          handleUpdate={ handleUpdate } />
      </td>
    </tr>
  )
}
