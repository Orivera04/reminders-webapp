import { UpdateButton, DeleteButton } from "./index"

export const ActionSection = ({ id, handleDelete, handleUpdate }) => {
  return (
    <div>
      <UpdateButton id={ id } handleUpdate={ handleUpdate }/>
      <DeleteButton id={ id } handleDelete={ handleDelete } />
    </div>
  )
}
