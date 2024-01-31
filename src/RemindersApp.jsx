import { AppRouter } from "./router/AppRouter"
import { Provider } from "react-redux"
import NavBar from "./components/NavBar"
import { store } from "../store"
import "./i18n/config.js";
import { Suspense } from "react";
import { Loader } from "./components/Loader.jsx";


function RemindersApp() {
  return (
    <>
      <Suspense fallback={ <Loader /> }>
        <Provider store = { store }>
          <NavBar />
          <AppRouter />
        </Provider>
      </Suspense>
    </>
  )
}

export default RemindersApp
