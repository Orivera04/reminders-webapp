import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const DeleteButton = ({ id, handleDelete }) => {
  return (
    <button class="p-3 rounded bg-red-500 hover:bg-red-600 text-white
                hover:text-gray-100 transition duration-300 ease-in-out ml-2"
            onClick={ () => handleDelete(id) }>
      <FontAwesomeIcon icon={ faTrash } />
    </button>
  )
}