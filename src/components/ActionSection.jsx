import { UpdateButton, DeleteButton } from "./index"

export const ActionSection = ({ id, onDelete, onUpdate }) => {
  return (
    <div>
      <UpdateButton id={ id } onUpdate={ onUpdate }/>
      <DeleteButton id={ id } onDelete={ onDelete } />
    </div>
  )
}
