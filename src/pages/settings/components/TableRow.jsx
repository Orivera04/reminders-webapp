import { MarkDownBadge, HtmlBadge } from './index'
import { ActionSection } from "../../../components/index"

const MARKDOWN_STYLE = 1;
const HTML_STYLE = 2;

export const TableRow = ({ id, apiTokenBot, markDownId, description, handleDelete, handleUpdate }) => {
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
        <ActionSection id={ id }
                       handleDelete={ handleDelete }
                       handleUpdate={ handleUpdate } />
      </td>
    </tr>
  )
}
