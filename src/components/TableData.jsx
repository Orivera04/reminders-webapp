import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActionSection } from "./ActionSection";


export const TableData = ({ translation_block, data, onDelete, onUpdate }) => {
  const [headers, setHeaders] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const newHeaders = buildHeaders();

    setHeaders(newHeaders);
  }, [data])

  const buildHeaders = () => {
    const headerKeys = Object.keys(data[0] || []);

    return [...headerKeys, ['actions']];
  }

  return (
    <table className='w-full sm:border sm:border-slate-200'>
      <thead className='hidden border-0 sm:table-header-group'>
        <tr>
          {
            headers.map((header) => (
              <th key={ header }
                  className='bg-slate-100 px-4 py-2 border-b-2 border-gray-200 text-left
                            text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                { t(`${translation_block}.${header}`) }
              </th>
            ))
          }
        </tr>
      </thead>

      <tbody className='bg-white dark:bg-transparent'>
        {
          data.map((element) => (
            <tr key={ element.id }
                className='text-sm border border-slate-200 flex flex-col mb-6 py-1 divide-y
                            divide-y-slate-50 sm:table-row sm:mb-0 sm:py-0 shadow-lg md:shadow-none'>
              {
                headers.map((header) => (
                  <td key={ `${header}-${element.id}` }
                      data-label={ t(`${translation_block}.${header}`) }
                      className='flex flex-col px-4 py-2 sm:table-cell sm:py-4 lg:table-cell
                                before:content-[attr(data-label)] sm:before:content-none
                                before:text-[0.625rem] before:uppercase before:font-medium'>
                    { element[header] || <ActionSection id={ element.id } onDelete={ onDelete } onUpdate={ onUpdate } /> }
                  </td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
