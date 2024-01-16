import { Route, Routes } from 'react-router-dom'
import { RemindersPage } from '../pages/RemindersPage'
import { RemindersFormPage } from '../pages/RemindersFormPage'

export const RemindersRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RemindersPage />} />
      <Route path="/new" element={<RemindersFormPage />} />
    </Routes>
  )
}
