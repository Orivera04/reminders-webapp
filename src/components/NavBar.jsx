import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="relative px-4 py-4 flex justify-between items-center bg-white shadow-lg">
      <a className="text-3xl font-bold leading-none" href="#">
        <img className="h-10" src="assets/reminder-logo.svg" alt="Reminders Logo" />
      </a>

      <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
        <li>
          <NavLink to="/reminders" activeClassName="text-blue-600" className="text-sm text-gray-400 hover:text-gray-500">Reminders</NavLink>
        </li>

        <li className="text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </li>

        <li>
          <NavLink to="/settings" className="text-sm text-gray-400 hover:text-gray-500">Settings</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;