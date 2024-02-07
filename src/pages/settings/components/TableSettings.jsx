import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from 'react';
import { TableData, Badge } from "../../../components";
import { getAllSettings, deleteSetting } from '../../../api';
import { onCloseLoader, onOpenLoader } from "../../../../store";
import { areYouSureAlert, successAlert, FORMATTING_STYLES } from "../../../helper";

export const TableSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(onOpenLoader());
    getAllSettings().then((data) => {
      const dataFormated = formattingStyleIdFormat(data);
      setData(dataFormated);
      dispatch(onCloseLoader());
    });
  }, []);

  const onDeleteSetting = (id) => {
    areYouSureAlert(t('setting_index_page.title_modal_delete_setting'),
                    t('setting_index_page.text_modal_delete_setting'),
                    () => {
      deleteSetting(id).then(() => {
        let newData = [...data];
        newData = newData.filter((element) => element.id !== id);
        setData(newData);
        successAlert(t('setting_index_page.setting_deleted_successfully'));
      })
    })
  }

  const formattingStyleIdFormat = (data) => {
    return data.map((element) => {
      const { content, color } = FORMATTING_STYLES[element.formatting_style_id];
      element.formatting_style_id = <Badge content={ content } color={ color } />;

      return element
  });
  }

  const onUpdateSetting = (id) => {
    navigate(`/settings/${id}/edit`);
  }

  return (
    <TableData translation_block={ 'setting_index_page' } data={ data } onDelete={ onDeleteSetting } onUpdate={ onUpdateSetting }/>
  )
}
