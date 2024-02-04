export const Badge = ({content, color}) => {
  const styleClass = `
    block py-1 text-center rounded-full bg-${ color }-200
    text-sm font-semibold text-${ color }-900 capitalize
    w-24
  `

  return (
    <span className={ styleClass } >
      { content }
    </span>
  )
}
