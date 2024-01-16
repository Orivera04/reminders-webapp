import { Navigate, Route, Routes } from "react-router-dom"
import { RemindersRoutes } from "../pages/reminders/router/RemindersRoutes"
import { SettingsRoutes } from "../pages/settings/router/SettingsRouter"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/reminders/*" element={<RemindersRoutes />} />
      <Route path="/settings" element={ <SettingsRoutes /> } />

      <Route path="*" element={<Navigate to="/reminders" replace={ true } />} />
    </Routes>
  )
}
