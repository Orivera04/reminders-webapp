import { useEffect, useState } from "react";
import { getSettings } from "../../../api/settings";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { createChat, getChatById, updateChat } from "../../../api/chat";
import { useDispatch } from "react-redux";
import { onCloseLoader, onOpenLoader } from "../../../../store";

export const ChatsFormPage = () => {

  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [chatForm, setChatForm] = useState({
    id: null,
    name: '',
    description: '',
    settingId: '',
    chatId: '',
    availableSettings: [],
  });

  const onInputChanged = ( {target} ) => {
    setChatForm({
      ...chatForm,
      [target.name]: target.value
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(onOpenLoader());

        const settingsResponse = await getSettings();
        setChatForm((prevForm) => ({
          ...prevForm,
          availableSettings: settingsResponse,
        }));

        if (id && settingsResponse.length > 0) {
          const chatData = await getChatById(id);
          setChatForm((prevForm) => ({
            ...prevForm,
            id: chatData.id,
            name: chatData.name,
            description: chatData.description,
            settingId: chatData.setting_id,
            chatId: chatData.chat_id,
          }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        sweetAlert(t('chat_form_page.error'), t('chat_form_page.error_getting_data'), 'error');
      } finally {
        dispatch(onCloseLoader());
      }
    };

    fetchData();
  }, [id]);

  const isFormValid = () => {
    if (chatForm.chatId === '') {
      sweetAlert(t('chat_form_page.error'), t('chat_form_page.chat_id_required'), 'error');
      return false;
    }

    if (chatForm.name === '') {
      sweetAlert(t('chat_form_page.error'), t('chat_form_page.name_required'), 'error');
      return false;
    }

    if (chatForm.description === '') {
      sweetAlert(t('chat_form_page.error'), t('chat_form_page.description_required'), 'error');
      return false;
    }

    if (chatForm.settingId === '') {
      sweetAlert(t('chat_form_page.error'), t('chat_form_page.setting_id_required'), 'error');
      return false;
    }

    return true;
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    dispatch( onOpenLoader() );

    try {
      if (chatForm.id) {
        await updateChat(id, chatForm);
        sweetAlert(t('chat_form_page.success'), t('chat_form_page.updated_chat'), 'success');
      }
      else {
        await createChat(chatForm);
        sweetAlert(t('chat_form_page.success'), t('chat_form_page.created_chat'), 'success');
      }

      dispatch( onCloseLoader() );
      navigate('/chats');
    } catch(error) {
      sweetAlert(t('chat_form_page.error'), t('chat_form_page.error_chat'), 'error');
    }
  }

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{ t('chat_form_page.chat') }</h2>
      </div>

      <form onSubmit={ handleSubmit } className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900"> { t('chat_form_page.name') } </label>
            <div className="mt-2.5">
              <input
                name='name'
                type="text"
                id="name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1
                          ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={ chatForm.name }
                onChange={ onInputChanged }
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900"> { t('chat_form_page.description') } </label>
            <div className="mt-2.5">
              <input
                name='description'
                type="text"
                id="description"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1
                          ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={ chatForm.description }
                onChange={ onInputChanged }
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900"> { t('chat_form_page.chat_id') } </label>
            <div className="mt-2.5">
              <input
                name='chatId'
                type="text"
                id="chatId"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1
                          ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={ chatForm.chatId }
                onChange={ onInputChanged }
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              { t('chat_form_page.bot') }
            </label>
            <div className="relative mt-2.5 w-full">
              <select name='settingId'
                          id="settingId"
                          className="absolute w-full h-full inset-y-0 rounded-md border-0 bg-transparent bg-none pl-2 text-gray-400
                                    focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                          value={ chatForm.settingId }
                          onChange={ onInputChanged }>
                  <option>  { t('chat_form_page.select_an_option') } </option>
                  {
                    chatForm.availableSettings?.map( (setting, _) => (
                      <option key={ setting.id } value={ setting.id }>{ setting.description }</option>
                    ))
                  }

                </select>

                <input className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1
                                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                  focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center
                                          text-sm font-semibold text-white shadow-sm hover:bg-indigo-500
                                          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                                          focus-visible:outline-indigo-600">
           { t('chat_form_page.submit')}
          </button>
        </div>
      </form>
    </div>
  )
}
