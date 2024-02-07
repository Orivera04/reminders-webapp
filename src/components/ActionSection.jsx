import { UpdateButton, DeleteButton } from "./"

export const ActionSection = ({ id, onDelete, onUpdate }) => {
  return (
    <>
      <UpdateButton id={ id } onUpdate={ onUpdate }/>
      <DeleteButton id={ id } onDelete={ onDelete } />
    </>
  )
}
