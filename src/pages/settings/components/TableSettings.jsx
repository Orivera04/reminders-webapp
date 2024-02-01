import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';

import { TableRow } from "./index";
import { Thead } from "../../../components";
import { getAllSettings, deleteSetting } from '../../../api';
import { areYouSureAlert, successAlert } from "../../../helper";
import { onCloseLoader, onOpenLoader } from "../../../../store";

export const TableSettings = () => {
  const { t } = useTranslation();

  const headers = [
    t('setting_index_page.id'),
    t('setting_index_page.api_token_bot'),
    t('setting_index_page.format_style'),
    t('setting_index_page.description'),
    t('setting_index_page.actions')
  ];

  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(onOpenLoader());

    getAllSettings().then((data) => {
      setData(data);
      dispatch(onCloseLoader());
    });
  }, []);

  const onDeleteSetting = (id) => {
    areYouSureAlert(t('setting_index_page.title_modal_delete_setting'), t('setting_index_page.text_modal_delete_setting'), () => {
      deleteSetting(id).then((message) => {
        let newData = [...data];
        newData = newData.filter((element) => element.id !== id);
        setData(newData);
        successAlert(message);
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
            data.map((element) => (
              <TableRow key={element.id} element={ element } onDelete={ onDeleteSetting } onUpdate={ onUpdateSetting } />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
