import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faRobot, faComment, faClock } from '@fortawesome/free-solid-svg-icons';

export const NavBarSidebarMenu = () => {
  const { t } = useTranslation();
  const [sidebarActive, setSidebarActive] = useState(false);
  const onClick = () => setSidebarActive(!sidebarActive);
  const itemActive = ({ isActive }) => (
    isActive ? 'text-blue-400 text-sm'
             : 'text-gray-400 text-sm');

  return (
    <div className="sm:hidden">
    <button className="text-3xl font-bold leading-none" onClick={ onClick }>
      <FontAwesomeIcon icon={ faBars } className='text-gray-700' />
    </button>

    { sidebarActive && (
      <div className="absolute top-0 left-0 w-full h-screen bg-transparent transition duration-300 ease-in-out z-40" onClick={ onClick }>
        <div className="w-64 sm:w-1/2 md:w-64 h-full bg-white shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl border">
          <img src="assets/reminder-logo.svg"
            alt="alt placeholder" className="w-10 h-10 mx-auto mb-5 rounded-full mt-2" />

          <ul className="text-gray-700">
            <li className='block cursor-pointer p-2 border-b-2 border-slate-100'>
              <NavLink to="/reminders" className={ itemActive }>
                <FontAwesomeIcon icon={ faClock } className='mr-2' />
                { t('navbar.reminders') }
              </NavLink>
            </li>

            <li className='block cursor-pointer p-2 border-b-2 border-slate-100'>
              <NavLink to="/chats" className={ itemActive }>
                <FontAwesomeIcon icon={ faComment } className='mr-2' />
                { t('navbar.chats') }
              </NavLink>
            </li>

            <li className='block cursor-pointer p-2 border-b-2 border-slate-100'>
              <NavLink to="/settings" className={ itemActive }>
                <FontAwesomeIcon icon={ faRobot } className='mr-2' />
                { t("navbar.bot") }
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    )}
  </div>
  )
}
