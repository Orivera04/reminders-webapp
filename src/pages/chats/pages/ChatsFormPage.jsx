import { useEffect, useState } from "react";
import { getSettings } from "../../../api/settings";

export const ChatsFormPage = () => {

  const [chatForm, setChatForm] = useState({
    id: null,
    name: '',
    description: '',
    setting_id: '',
    chat_id: '',
    availableSettings: [],
  });

  const onInputChanged = ( {target} ) => {
    setChatForm({
      ...chatForm,
      [target.name]: target.value
    });
  };

  useEffect( () => {
    const storedSettings = JSON.parse(localStorage.getItem('storedSettings'));
    if (storedSettings === null) {
      getSettings.then(response => {

        setChatForm({
          ...chatForm,
          avaialbleSettings: response,
        });

        localStorage.setItem('storedSettings', JSON.stringify(response));
        return;
      })
    }

    setChatForm({
      ...chatForm,
      avaialbleSettings: storedSettings,
    });
  }, [  ]);

  const handleSubmit = (event) => {

  }

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"> sdsds </h2>
      </div>

      <form onSubmit={ handleSubmit } className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900"> Token </label>
            <div className="mt-2.5">
              <input
                name='token_bot_api'
                type="text"
                id="token"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1
                          ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                        focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={ chatForm.name }
                onChange={ onInputChanged }
              />
            </div>
          </div>

        </div>

        <div className="mt-10">
          <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center
                                          text-sm font-semibold text-white shadow-sm hover:bg-indigo-500
                                          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                                          focus-visible:outline-indigo-600">
           Submit
          </button>
        </div>
      </form>
    </div>
  )
}
