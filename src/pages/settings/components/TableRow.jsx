import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MarkDownBadge } from './MarkDownBadge'
import { HtmlBadge } from './HtmlBadge'

const MARKDOWN_STYLE = 1;
const HTML_STYLE = 2;

export const TableRow = ({ id, apiTokenBot, markDownId, description }) => {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { id }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { apiTokenBot }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { markDownId === MARKDOWN_STYLE ? <MarkDownBadge /> : <HtmlBadge /> }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { description }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button class="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white hover:text-gray-100 transition duration-300 ease-in-out">
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>

        <button class="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white hover:text-gray-100 transition duration-300 ease-in-out ml-2">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  )
}
