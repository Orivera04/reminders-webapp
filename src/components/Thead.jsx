export const Thead = ({ headers }) => {
  return (
    <thead>
      <tr>
        {
          headers.map((header, _) => (
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left
                          text-xs font-semibold text-gray-700 uppercase tracking-wider">
            {header}
            </th>
          ))
        }
      </tr>
    </thead>
  )
}
