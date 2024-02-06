
import { useTranslation } from "react-i18next";

export const TableDataRows = ({ translation_block, headers, data}) => {
  const { t } = useTranslation();

  return (
    <tr className='text-sm border border-slate-200 flex flex-col mb-6 py-1 divide-y
                  divide-y-slate-50 sm:table-row sm:mb-0 sm:py-0 shadow-lg md:shadow-none'>
      {
        headers.map((header) => (
          <td key={ `${header}-${data.id}` }
              data-label={ t(`${translation_block}.${header}`) }
              className='flex flex-col px-4 py-2 sm:table-cell sm:py-4 lg:table-cell
                        before:content-[attr(data-label)] sm:before:content-none
                        before:text-[0.625rem] before:uppercase before:font-medium'>
            { data[`${translation_block}.${header}`] }
          </td>
        ))
      }
    </tr>
  );
}
