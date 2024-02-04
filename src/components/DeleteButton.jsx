import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const DeleteButton = ({ id, onDelete }) => {
  return (
    <button className='bg-red-500 hover:bg-red-600 py-2.5 px-3.5 rounded-md text-white
                    hover:text-gray-100 transition duration-300 ease-in-out text-center m-1'
            data-testid="delete-button"
            onClick={ () => onDelete(id) }>
      <FontAwesomeIcon icon={ faTrash } />
    </button>
  )
}
