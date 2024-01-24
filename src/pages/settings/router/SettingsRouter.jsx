import { Route, Routes } from 'react-router-dom'
import { SettingsPage } from '../pages/SettingsPage'
import { SettingsNewPage } from '../pages/SettingsNewPage'


export const SettingsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SettingsPage />} />
      <Route path="/new" element={ <SettingsNewPage />} />
    </Routes>
  )
}
