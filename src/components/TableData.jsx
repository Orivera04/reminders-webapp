import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { TableDataRows } from "./TableDataRows";
import { ActionSection } from "./ActionSection";


export const TableData = ({ translation_block, data, onDelete, onUpdate }) => {
  const [headers, setHeaders] = useState([]);
  const [dataFormated, setDataFormated] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const newHeaders = buildHeaders();
    const newData = buildNewData();

    setHeaders(newHeaders);
    setDataFormated(newData);
  }, [data])

  const buildHeaders = () => {
    const headerKeys = Object.keys(data[0] || []);

    return [...headerKeys, ['actions']];
  }

  const buildNewData = () => {
    return data.map((element) => (
      headers.reduce((acc, header) => {
        acc[`${translation_block}.${header}`] = element[header] ||
                                                <ActionSection id={ element.id }
                                                               onDelete={ onDelete }
                                                               onUpdate={ onUpdate } />;
        return acc;
      }, {})
    ))
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
          dataFormated.map((element) => (
            <TableDataRows key={element.id} translation_block={ translation_block } headers={ headers } data={ element } />
          ))
        }
      </tbody>
    </table>
  )
}