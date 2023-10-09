import { TableRow } from "./TableRow"

export const TableSettings = () => {
  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            ID
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Token Api Bot
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Estilo de formateo
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Descripción
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <TableRow id= { 1 } apiTokenBot= { '5142808922:AAFr6rxNrkTggbcMiip68HJZkChy4kdb5Qw'} markDownId= { 1 } description = 'YubeRecordatorios Bot' />
        <TableRow id= { 2 } apiTokenBot= { '5142808922:sdsdsdsds'} markDownId= { 2 } description = 'TelePagos Bot' />
      </tbody>
    </table>
  )
}
