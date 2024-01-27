import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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

  const onUpdateSetting = (id) => {
    navigate(`/settings/${id}/edit`);
  }

  return (
    <div>
      <table className="min-w-full leading-normal">
        <Thead headers={ headers } />
        <tbody>
          {
            data && data.map((element) => (
              <TableRow key={element.id} element={ element } onDelete={ onDeleteSetting } onUpdate={ onUpdateSetting } />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
