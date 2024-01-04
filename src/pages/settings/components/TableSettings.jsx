import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Thead } from "./Thead"
import { TableRow } from "./TableRow"

// TODO: pendiente de utilizar variables de entorno para esta URL.
// TODO: pendiente de pasar esta constante a un scope global.
const api = axios.create({ baseURL: 'http://127.0.0.1:3000'})

export const TableSettings = () => {
  const headers = [
    'ID',
    'Token Api Bot',
    'Estilo de formateo',
    'Descripción',
    'Acciones'
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

  return (
    <table className="min-w-full leading-normal">
      <Thead headers={headers} />

      <tbody>
        {
          data && data.map((element, _) => (
            <TableRow id={element.id}
                      apiTokenBot={ element.token_bot_api }
                      markDownId={ element.formatting_style_id }
                      description={ element.description } />
          ))
        }
      </tbody>
    </table>
  )
}
