import { Navigate, Route, Routes } from "react-router-dom"
import { RemindersRoutes } from "../pages/reminders/router/RemindersRoutes"
import { SettingsRoutes } from "../pages/settings/router/SettingsRouter"
import { useSelector } from "react-redux"
import { Loader } from "../components/Loader"


export const AppRouter = () => {
  const { isLoading } = useSelector(state => state.ui);

  return (
    <>
      { isLoading && <Loader />}

      <div style={{ display: isLoading ? 'none' : 'block' }}>
        <Routes>
          <Route path="/reminders/*" element={<RemindersRoutes />} />
          <Route path="/settings/*" element={ <SettingsRoutes /> } />

          <Route path="*" element={<Navigate to="/reminders" replace={ true } />} />
        </Routes>
      </div>
    </>
  )
}
