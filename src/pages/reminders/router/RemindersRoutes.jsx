import { Route, Routes } from 'react-router-dom'
import { RemindersPage } from '../pages/RemindersPage'

export const RemindersRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RemindersPage />} />
    </Routes>
  )
}
