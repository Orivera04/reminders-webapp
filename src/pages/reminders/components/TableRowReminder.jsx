import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export const TableRowReminder = ({ id, chatID, message, reminderType, BotName }) => {
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
        <button className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white hover:text-gray-100 transition duration-300 ease-in-out">
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>

        <button className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white hover:text-gray-100 transition duration-300 ease-in-out ml-2">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  )
}
