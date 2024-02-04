import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const UpdateButton = ({ id, onUpdate }) => {
  return (
    <button className="p-3 rounded bg-blue-500 hover:bg-blue-600 text-white
                hover:text-gray-100 transition duration-300 ease-in-out"
            data-testid="update-button"
            onClick={ () => onUpdate(id) }>
      <FontAwesomeIcon icon={faPenToSquare} />
    </button>
  )
}
