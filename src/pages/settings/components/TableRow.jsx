import { MarkDownBadge } from './MarkDownBadge'
import { HtmlBadge } from './HtmlBadge'

import { ActionSection } from "../../../components/ActionSection"

const MARKDOWN_STYLE = 1;
const HTML_STYLE = 2;

export const TableRow = ({ id, apiTokenBot, markDownId, description, handleDelete }) => {
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
        <ActionSection id={ id } handleDelete={ handleDelete } />
      </td>
    </tr>
  )
}
