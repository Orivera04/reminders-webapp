import { ThreeDots } from 'react-loader-spinner'

export const Loader = () => {

  return (
    <div className="flex items-center justify-center h-screen">
      <ThreeDots
        visible={true}
        height="200"
        width="200"
        color="#2563EB"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}
