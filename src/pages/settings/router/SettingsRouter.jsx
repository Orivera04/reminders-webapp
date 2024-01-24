import { Route, Routes } from 'react-router-dom'
import { SettingsPage } from '../pages/SettingsPage'
import { SettingsNewPage } from '../pages/SettingsNewPage'
import { SettingsEditPage } from '../pages/SettingsEditPage'


export const SettingsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SettingsPage />} />
      <Route path="/new" element={ <SettingsNewPage />} />
      <Route path="/:id/edit" element={ <SettingsEditPage />} />
    </Routes>
  )
}
