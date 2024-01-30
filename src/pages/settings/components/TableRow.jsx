import { MarkDownBadge, HtmlBadge } from './index'
import { ActionSection } from "../../../components/index"

const MARKDOWN_STYLE = 1;
const HTML_STYLE = 2;

export const TableRow = ({ element, onDelete, onUpdate }) => {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { element.id }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { element.token_bot_api }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { element.formatting_style_id === MARKDOWN_STYLE ? <MarkDownBadge /> : <HtmlBadge /> }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        { element.description }
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <ActionSection id={ element.id } onDelete={ onDelete } onUpdate={ onUpdate } />
      </td>
    </tr>
  )
}
