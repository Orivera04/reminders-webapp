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
        setReminderForm((prevForm) => ({
          ...prevForm,
          availableChats: chatOptions,
        }));

        if (id) {
          const reminderData = await getReminderById(id);
          setReminderForm((prevForm) => ({
            ...prevForm,
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

      <form onSubmit={ handleSubmit } >
        <div className='flex justify-center flex-col sm:flex-row'>
          <div className="flex-1 max-w-2xl p-6 bg-white rounded-md shadow m-0 mb-5 sm:m-5">
              <h2 className="text-2xl font-bold mb-4">{ t('reminder_form_page.create_reminder') }</h2>

              <div className="mb-4">
                <label htmlFor="typeScheduleId" className="block text-gray-700 text-sm font-bold mb-2">
                { t('reminder_form_page.chat') }
                </label>
                <div className='relative mt-2.5 w-full'>
                  <select
                    id="chatId"
                    name="chatId"
                    className="absolute w-full h-full inset-y-0 rounded-md border-0 bg-transparent bg-none pl-2 text-gray-900
                              focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm appearance-none z-10"
                    value = { reminderForm.chatId }
                    onChange={ onInputChanged }
                    data-testid="chatId"
                  >

                    <option value=''>{ t('reminder_form_page.select_a_chat') }</option>
                    {
                      reminderForm.availableChats?.map( (chat, _) => (
                        <option key={ chat.id } value={ chat.id }>{ chat.name }</option>
                      ))
                    }
                  </select>

                  <input className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1
                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                    focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                  <div className='absolute top-3 right-0 z-0'>
                    <svg className="fill-current h-4 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>

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
                  data-testid="message"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="typeScheduleId" className="block text-gray-700 text-sm font-bold mb-2">
                { t('reminder_form_page.type_schedule') }
                </label>

                <div className='relative mt-2.5 w-full'>
                  <select
                    id="typeScheduleId"
                    name="typeScheduleId"
                    className="absolute w-full h-full inset-y-0 rounded-md border-0 bg-transparent bg-none pl-2 text-gray-900
                              focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm appearance-none z-10"
                    value = { reminderForm.typeScheduleId }
                    onChange={ onTypeScheduleChanged }
                    data-testid="typeScheduleId"
                  >
                    <option value="1">{ t('reminder_form_page.daily') }</option>
                    <option value="2">{ t('reminder_form_page.specific') }</option>
                  </select>

                  <input className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1
                                    ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                    focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                  <div className='absolute top-3 right-0 z-0'>
                    <svg className="fill-current h-4 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
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
