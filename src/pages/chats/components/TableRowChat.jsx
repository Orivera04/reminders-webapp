import { ActionSection } from "../../../components"

export const TableRowChat = ({ id, name, description, chatId, handleDelete, handleUpdate }) => {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { id }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { name }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { description }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { chatId }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <ActionSection id={ id }
          onDelete={ handleDelete }
          onUpdate={ handleUpdate } />
      </td>
    </tr>
  )
}
