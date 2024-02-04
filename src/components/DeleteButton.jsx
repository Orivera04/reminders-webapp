import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const DeleteButton = ({ id, onDelete }) => {
  return (
    <button className="p-3 rounded bg-red-500 hover:bg-red-600 text-white
                hover:text-gray-100 transition duration-300 ease-in-out ml-2"
            data-testid="delete-button"
            onClick={ () => onDelete(id) }>
      <FontAwesomeIcon icon={ faTrash } />
    </button>
  )
}
