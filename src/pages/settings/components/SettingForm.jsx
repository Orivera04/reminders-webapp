import { useEffect, useState } from 'react';
import { errorAlert, SETTING_DEFAULT_FIELDS } from '../../../helper';

export const SettingForm = ({ type, onSave, setting }) => {
  const formType = {
    'create': {
      'title': 'Create Setting',
      'button': 'Create'
    },
    'update': {
      'title': 'Update Setting',
      'button': 'Update'
    }
  };

  const [formData, setFormData] = useState(SETTING_DEFAULT_FIELDS);

  useEffect(() => {
    if(setting) return setFormData(setting);

    setFormData(SETTING_DEFAULT_FIELDS);
  }, [setting]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formDataIsValid = () => {
    return (
      !(formData.token_bot_api.trim() === '' ||
        formData.description.trim() === '' ||
        formData.formatting_style_id === '')
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formDataIsValid()) return errorAlert('Error', 'All fields are required!');

    onSave(formData);
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"> { formType[type].title } </h2>
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
                value={ formData.token_bot_api }
                onChange={ handleChange }
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900"> Format style </label>
            <div className="relative mt-2.5">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <select name='formatting_style_id'
                        id="format"
                        className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400
                                  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        value={ formData.formatting_style_id }
                        onChange={ handleChange }>
                  <option> Select an option </option>
                  <option value={ 1 }> Markdown </option>
                  <option value={ 2 }> HTML </option>
                </select>
              </div>
              <input className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900"> Description </label>
            <div className="mt-2.5">
              <textarea name='description'
                        id="description"
                        rows="4"
                        value={ formData.description }
                        onChange={ handleChange }
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset
                                ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                                  sm:text-sm sm:leading-6">
              </textarea>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center
                                          text-sm font-semibold text-white shadow-sm hover:bg-indigo-500
                                          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                                          focus-visible:outline-indigo-600">
            { formType[type].button }
          </button>
        </div>
      </form>
    </div>
  );
}