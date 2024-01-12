import React, { useEffect, useState } from 'react';

import { Thead } from "../../../components/"
import { TableRow } from "./TableRow"
import { api } from '../../../helper/api';
import { deleteAlert } from '../../../helper';

export const TableSettings = () => {
  const headers = [
    'ID',
    'Api Token Bot',
    'Format Style',
    'Description',
    'Actions'
  ];

  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/settings')
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.error('error al obtener datos', error);
      })
  }, [])

  const handleDeleteSetting = (id) => {
    deleteAlert(async () => {
      try {
        const result = await api.delete(`/settings/${id}`);
        if(result.status === 200) {
          let newData = [...data];
          newData = newData.filter((element) => element.id !== id);
          setData(newData);
        } else {
          console.error('Error:', result.status);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    })
  }

  return (
    <table className="min-w-full leading-normal">
      <Thead headers={ headers } />
      <tbody>
        {
          data && data.map((element, _) => (
            <TableRow id={element.id}
                      apiTokenBot={ element.token_bot_api }
                      markDownId={ element.formatting_style_id }
                      description={ element.description }
                      handleDelete={ handleDeleteSetting }/>
          ))
        }
      </tbody>
    </table>
  )
}
