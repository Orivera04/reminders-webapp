import { Route, Routes } from "react-router-dom"
import { ChatsFormPage } from "../pages/ChatsFormPage"
import { ChatsPage } from "../pages/ChatsPage"

export const ChatsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ChatsPage />} />
      <Route path="/new" element={<ChatsFormPage />} />
      <Route path="/edit/:id" element={<ChatsFormPage />} />
    </Routes>
  )
}
