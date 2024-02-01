import { useEffect, useState } from 'react'
import { DailySchedules, SpecificSchedule } from '../components';
import { DAILY_SCHEDULE, DEFAULT_DAILY_SCHEDULES, DEFAULT_SPECIFIC_SCHEDULE } from '../../../helper/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { createReminder, getReminderById, updateReminder } from '../../../api/reminders';
import { useDispatch } from 'react-redux';
import { onCloseLoader, onOpenLoader } from '../../../../store';
import { SendReminder } from '../components/SendReminder';
import { useTranslation } from 'react-i18next';
import { getAllChats } from '../../../api/chat';

export const RemindersFormPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [reminderForm, setReminderForm] = useState({
    availableChats: [],
    chatId: '',
    id: null,
    message: '',
    schedules: DEFAULT_DAILY_SCHEDULES,
    typeScheduleId: DAILY_SCHEDULE
  });

  const onInputChanged = ( {target} ) => {
    setReminderForm({
      ...reminderForm,
      [target.name]: target.value
    });
  };

  const onTypeScheduleChanged = ( { target } ) => {
    const schedules = (target.value == DAILY_SCHEDULE) ? DEFAULT_DAILY_SCHEDULES : DEFAULT_SPECIFIC_SCHEDULE;

    setReminderForm({
      ...reminderForm,
      typeScheduleId: target.value,
      schedules: schedules
    });
  }

  const onScheduleChanged = ( { target } ) => {
    setReminderForm({
      ...reminderForm,
      schedules: {
        ...reminderForm.schedules,
        [target.name]: target.value
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(onOpenLoader());

        const chatOptions = await getAllChats();
        setReminderForm({
          ...reminderForm,
          availableChats: chatOptions,
        });

        if (id) {
          const reminderData = await getReminderById(id);
          setReminderForm(({
            ...reminderForm,
            id: reminderData.id,
            chatId: reminderData.chatId,
            message: reminderData.message,
            typeScheduleId: reminderData.typeScheduleId,
            schedules: reminderData.schedules,
          }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        sweetAlert(t('reminder_form_page.error'), t('reminder_form_page.error_getting_data'), 'error');
      } finally {
        dispatch(onCloseLoader());
      }
    };

    fetchData();
  }, [id]);

  const isFormValid = () => {
    if (reminderForm.chatId === '') {
      sweetAlert(t('reminder_form_page.error'), t('reminder_form_page.chat_id_required'), 'error');
      return false;
    }

    if (reminderForm.message === '') {
      sweetAlert(t('reminder_form_page.error'), t('reminder_form_page.message_required'), 'error');
      return false;
    }

    return true;
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    dispatch( onOpenLoader() );

    try {
      if (reminderForm.id) {
        await updateReminder(reminderForm);
        sweetAlert(t('reminder_form_page.success'), t('reminder_form_page.updated_reminder'), 'success');
      }
      else {
        await createReminder(reminderForm);
        sweetAlert(t('reminder_form_page.success'), t('reminder_form_page.created_reminder'), 'success');
      }

      dispatch( onCloseLoader() );
      navigate('/reminders');
    } catch(error) {
      sweetAlert(t('reminder_form_page.error'), t('reminder_form_page.error_reminder'), 'error');
    }
  };

  return (
    <>
      {
        !!id && <SendReminder reminderId= { id } />
      }

      <form onSubmit={ handleSubmit }>
        <div className='flex justify-center m-5'>
          <div className="flex-1 max-w-2xl p-6 bg-white rounded-md shadow w-4/5 mr-10">
              <h2 className="text-2xl font-bold mb-4">{ t('reminder_form_page.create_reminder') }</h2>

              <div className="mb-4">
                <label htmlFor="typeScheduleId" className="block text-gray-700 text-sm font-bold mb-2">
                { t('reminder_form_page.chat') }
                </label>
                <select
                  id="chatId"
                  name="chatId"
                  className="w-full p-2 border rounded-md"
                  value = { reminderForm.chatId }
                  onChange={ onInputChanged }
                >

                  <option value=''>{ t('reminder_form_page.select_a_chat') }</option>
                  {
                    reminderForm.availableChats?.map( (chat, _) => (
                      <option key={ chat.id } value={ chat.id }>{ chat.description }</option>
                    ))
                  }
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                { t('reminder_form_page.message') }
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full p-2 border rounded-md"
                  rows="4"
                  placeholder= { t('reminder_form_page.placeholder_message') }
                  value = { reminderForm.message }
                  onChange={ onInputChanged }
                />
              </div>

              <div className="mb-4">
                <label htmlFor="typeScheduleId" className="block text-gray-700 text-sm font-bold mb-2">
                { t('reminder_form_page.type_schedule') }
                </label>
                <select
                  id="typeScheduleId"
                  name="typeScheduleId"
                  className="w-full p-2 border rounded-md"
                  value = { reminderForm.typeScheduleId }
                  onChange={ onTypeScheduleChanged }
                >
                  <option value="1">{ t('reminder_form_page.daily') }</option>
                  <option value="2">{ t('reminder_form_page.specific') }</option>
                </select>
              </div>
          </div>

          {
            (reminderForm.typeScheduleId == DAILY_SCHEDULE)
              ? <DailySchedules handleScheduleChange={ onScheduleChanged } schedules= { reminderForm.schedules } />
              : <SpecificSchedule handleScheduleChange={ onScheduleChanged } schedules= { reminderForm.schedules } />
          }

        </div>

        <div className='flex justify-center'>
          <button type="submit" className="block w-80 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center
                                            text-sm font-semibold text-white shadow-sm hover:bg-indigo-500
                                            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                                            focus-visible:outline-indigo-600 mb-1">
          { t('reminder_form_page.submit') }
          </button>
        </div>
      </form>
    </>
  );
}
