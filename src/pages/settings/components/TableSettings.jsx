import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

import { Thead } from "../../../components";
import { areYouSureAlert } from "../../../helper";
import { TableRow } from "./index";
import { onCloseLoader, onOpenLoader } from "../../../../store";
import { getAllSettings, deleteSetting } from '../../../api';

export const TableSettings = () => {
  const headers = [
    'ID',
    'Api Token Bot',
    'Format Style',
    'Description',
    'Actions'
  ];

  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedSettings = JSON.parse(localStorage.getItem('storedSettings'));

    if(storedSettings) return setData(storedSettings);

    dispatch(onOpenLoader());

    getAllSettings().then((data) => {
      setData(data);
      localStorage.setItem('storedSettings', JSON.stringify(data));
      dispatch(onCloseLoader());
    });
  }, []);

  const onDeleteSetting = (id) => {
    deleteSetting(id).then((message) => {
      areYouSureAlert(message, () => {
        let newData = [...data];
        newData = newData.filter((element) => element.id !== id);
        localStorage.setItem('storedSettings', JSON.stringify(newData));
        setData(newData);
      })
    })
  }

  return (
    <div>
      <table className="min-w-full leading-normal">
        <Thead headers={ headers } />
        <tbody>
          {
            data && data.map((element) => (
              <TableRow key={element.id} element={ element } onDelete={ onDeleteSetting } />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
