import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const UpdateButton = ({ id, onUpdate }) => {
  return (
    <button className='bg-blue-500 hover:bg-blue-600 text-white hover:text-gray-100
                      transition duration-300 ease-in-out py-2.5 px-3.5 rounded-md text-center
                      m-1'
            data-testid="update-button"
            onClick={ () => onUpdate(id) }>
      <FontAwesomeIcon icon={faPenToSquare} />
    </button>
  )
}
