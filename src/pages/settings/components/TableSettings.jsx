import React, { useEffect, useState } from 'react';

import { Thead } from "../../../components";
import { deleteAlert } from "../../../helper";
import { TableRow } from "./index";
import { api, getSettings } from '../../../api';

export const TableSettings = () => {
  const headers = [
    'ID',
    'Api Token Bot',
    'Format Style',
    'Description',
    'Actions'
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    getSettings()
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.error('error al obtener datos', error);
      })
  }, [])

  const onDeleteSetting = (id) => {
    deleteAlert(async () => {
      try {
        const response = await api.delete(`/settings/${id}`);
        if(response.status === 200) {
          let newData = [...data];
          newData = newData.filter((element) => element.id !== id);
          setData(newData);
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    })
  }

  return (
    <div>
      <table className="min-w-full leading-normal">
        <Thead headers={ headers } />
        <tbody>
          {
            data.map((element) => (
              <TableRow key={element.id} element={ element } onDelete={ onDeleteSetting } />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
