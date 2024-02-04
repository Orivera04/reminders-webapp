import { NavLink } from 'react-router-dom';
import { Separator, TranslationSwitcher, NavBarSidebarMenu } from './';
import { useTranslation } from 'react-i18next';

function NavBar() {
  const { t } = useTranslation();
  const itemActive = ({ isActive }) => (
    isActive ? 'text-blue-600 text-sm hover:text-red-400'
             : 'text-gray-400 text-sm hover:text-red-400');

  return (
    <nav className="relative px-4 py-4 flex justify-between items-center bg-white shadow-lg">
      <a className="hidden sm:inline text-3xl font-bold leading-none" href="#">
        <img className="h-10" src="assets/reminder-logo.svg" alt="Reminders Logo" />
      </a>

      <ul className="hidden sm:flex absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto sm:items-center sm:w-auto sm:space-x-6">
        <li>
          <NavLink
            to="/reminders"
            className={ itemActive }>
            { t('navbar.reminders') }
          </NavLink>
        </li>

        <Separator />

        <li>
          <NavLink
            to="/chats"
            className={ itemActive }>
            { t('navbar.chats') }
          </NavLink>
        </li>

        <Separator />

        <li>
          <NavLink
            to="/settings"
            className={ itemActive }>
            { t("navbar.bot") }
          </NavLink>
        </li>
      </ul>

      <NavBarSidebarMenu />

      <TranslationSwitcher />
    </nav>
  );
}

export default NavBar;