import { Outlet } from "react-router-dom"
import TheHeader from "../components/TheHeader"
import TheFooter from "../components/TheFooter"

const RootLayout = () => {
  return (
    <>
      <TheHeader />
      <main>
        <div className="!container">
          <Outlet />
        </div>
      </main>
      <TheFooter />

      {/* The ! in front of a Tailwind CSS class is used to apply important to that specific utility. It forces the style to override any other conflicting styles, including styles coming from libraries like Material-UI (MUI) or other CSS. */}
    </>
  )
}

export default RootLayout