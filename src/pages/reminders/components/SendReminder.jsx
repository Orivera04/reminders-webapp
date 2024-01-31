import { faMessage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { sendReminder } from "../../../api/reminders"
import { onCloseLoader, onOpenLoader } from "../../../../store";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export const SendReminder = ({ reminderId }) => {

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onSendReminder = ( reminderId ) => {
    dispatch( onOpenLoader() );

    sendReminder( reminderId ).then(response => {
      sweetAlert('Sucess', t('reminder_form_page.send_reminder_success'), 'success');
      dispatch( onCloseLoader() );
    }).catch(error => {
      dispatch( onCloseLoader() );
      console.log(error);
      sweetAlert('Error', t('reminder_form_page.error_sending_reminder'), 'success');
    });
  }

  return (
    <div className='flex'>
        <div className="w-1/2"></div>
        <div className="w-1/2 h-12">
          <div className='flex justify-center'>
            <button onClick={ () => onSendReminder(reminderId) } className='flex bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4'>
              <FontAwesomeIcon icon={ faMessage } />
              &nbsp;
              { t('reminder_form_page.send_reminder') }
            </button>
          </div>
        </div>
    </div>
  )
}
