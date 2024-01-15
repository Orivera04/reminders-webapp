import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const UpdateButton = () => {
  return (
    <button className="p-3 rounded bg-blue-500 hover:bg-blue-600 text-white
                hover:text-gray-100 transition duration-300 ease-in-out">
      <FontAwesomeIcon icon={faPenToSquare} />
    </button>
  )
}
