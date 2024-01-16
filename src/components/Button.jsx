export const Button = ({ title, handleClick }) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            onClick={ handleClick }>
      { title }
    </button>
  )
}
