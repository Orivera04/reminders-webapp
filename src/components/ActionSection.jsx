import { UpdateButton, DeleteButton } from "./index"

export const ActionSection = ({ id, onDelete }) => {
  return (
    <div>
      <UpdateButton id={ id } />
      <DeleteButton id={ id } onDelete={ onDelete } />
    </div>
  )
}
