import { useEffect, useState } from 'react'
import { getSettings } from '../../../api/settings';
import { DailySchedules, SpecificSchedule } from '../components';
import { DAILY_SCHEDULE, DEFAULT_DAILY_SCHEDULES, DEFAULT_SPECIFIC_SCHEDULE } from '../../../helper/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { createReminder, getReminderById, updateReminder } from '../../../api/reminders';
import { useDispatch } from 'react-redux';
import { onCloseLoader, onOpenLoader } from '../../../../store';
import { SendReminder } from '../components/SendReminder';

export const RemindersFormPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [reminderForm, setReminderForm] = useState({
    id: null,
    chatId: '',
    message: '',
    typeScheduleId: DAILY_SCHEDULE,
    availableSettings: [],
    settingIdSelected: '',
    schedules: DEFAULT_DAILY_SCHEDULES
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

  useEffect( () => {
    const storedSettings = JSON.parse(localStorage.getItem('storedSettings'));
    if (storedSettings === null) {
      getSettings().then(response => {

        setReminderForm({
          ...reminderForm,
          availableSettings: response,
        });

        localStorage.setItem('storedSettings', JSON.stringify(response));
        return;
      })
    }

    setReminderForm({
      ...reminderForm,
      availableSettings: storedSettings,
    });
  }, [  ]);

  useEffect( () => {
    if (!id || reminderForm.availableSettings.length === 0) return;

    dispatch( onOpenLoader() );

    getReminderById(id).then(response => {
      setReminderForm({
        ...reminderForm,
        id: response.id,
        chatId: response.chatId,
        message: response.message,
        typeScheduleId: response.typeScheduleId,
        settingIdSelected: response.settingId,
        schedules: response.schedules
      });

      dispatch( onCloseLoader() );
    })
    .catch(error => {
      console.log(error);
      sweetAlert('Error', 'Error getting reminder there was an network error, please try again later.', 'error');
    });
  }, [ reminderForm.availableSettings ]);

  const isFormValid = () => {
    if (reminderForm.chatId === '') {
      sweetAlert('Error', 'Chat ID is required', 'error');
      return false;
    }

    if (reminderForm.message === '') {
      sweetAlert('Error', 'Message is required', 'error');
      return false;
    }

    if (reminderForm.settingIdSelected === '') {
      sweetAlert('Error', 'Setting is required', 'error');
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
        const responseMessage = await updateReminder(reminderForm);
        sweetAlert('Success', responseMessage, 'success');

      }
      else {
        const responseMessage = await createReminder(reminderForm);
        sweetAlert('Success', responseMessage, 'success');
      }

      dispatch( onCloseLoader() );
      navigate('/reminders');
    } catch(error) {
      sweetAlert('Error', 'Error creating reminder there was an network error, please try again later.', 'error');
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
              <h2 className="text-2xl font-bold mb-4">Create new reminder</h2>
              <div className="mb-4">
                <label htmlFor="chatId" className="block text-gray-700 text-sm font-bold mb-2">
                  Chat ID
                </label>
                <input
                  type="text"
                  id="chatId"
                  name="chatId"
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your group chat ID"
                  value = { reminderForm.chatId }
                  onChange={ onInputChanged }
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full p-2 border rounded-md"
                  rows="4"
                  placeholder="Enter your message..."
                  value = { reminderForm.message }
                  onChange={ onInputChanged }
                />
              </div>

              <div className="mb-4">
                <label htmlFor="typeScheduleId" className="block text-gray-700 text-sm font-bold mb-2">
                  Type Schedule
                </label>
                <select
                  id="typeScheduleId"
                  name="typeScheduleId"
                  className="w-full p-2 border rounded-md"
                  value = { reminderForm.typeScheduleId }
                  onChange={ onTypeScheduleChanged }
                >
                  <option value="1">Daily</option>
                  <option value="2">Specific</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="typeScheduleId" className="block text-gray-700 text-sm font-bold mb-2">
                  Setting
                </label>
                <select
                  id="settingIdSelected"
                  name="settingIdSelected"
                  className="w-full p-2 border rounded-md"
                  value = { reminderForm.settingIdSelected }
                  onChange={ onInputChanged }
                >

                  <option value=''>Select a setting</option>
                  {
                    reminderForm.availableSettings?.map( (setting, _) => (
                      <option key={ setting.id } value={ setting.id }>{ setting.description }</option>
                    ))
                  }
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
          <button type='submit' className='flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-20 mb-1'>Submit</button>
        </div>
      </form>
    </>
  );
}
