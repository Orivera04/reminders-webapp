import { NavLink } from 'react-router-dom';
import { Separator } from './Separator';

function NavBar() {
  return (
    <nav className="relative px-4 py-4 flex justify-between items-center bg-white shadow-lg">
      <a className="text-3xl font-bold leading-none" href="#">
        <img className="h-10" src="assets/reminder-logo.svg" alt="Reminders Logo" />
      </a>

      <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
        <li>
          <NavLink
            to="/reminders"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 text-sm hover:text-red-400'
                : 'text-gray-400 text-sm hover:text-red-400'
            }
          >
            Reminders
          </NavLink>
        </li>

        <Separator />

        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 text-sm hover:text-red-400'
                : 'text-gray-400 text-sm hover:text-red-400'
            }
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;