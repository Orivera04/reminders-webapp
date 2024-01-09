import { DeleteButton } from "./DeleteButton"
import { UpdateButton } from "./UpdateButton"

export const ActionSection = ({ id, handleDelete }) => {
  return (
    <div>
      <UpdateButton />
      <DeleteButton id={ id } handleDelete={ handleDelete } />
    </div>
  )
}
