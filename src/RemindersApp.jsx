import { AppRouter } from "./router/AppRouter"
import { Provider } from "react-redux"
import NavBar from "./components/NavBar"
import { store } from "../store"

function RemindersApp() {
  return (
    <>
      <Provider store = { store }>
        <NavBar />
        <AppRouter />
      </Provider>
    </>
  )
}

export default RemindersApp
