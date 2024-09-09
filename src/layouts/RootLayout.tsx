import { Outlet } from "react-router-dom"
import TheHeader from "../components/TheHeader"
import TheFooter from "../components/TheFooter"

const RootLayout = () => {
  return (
    <>
      <TheHeader />
      <main>
      <div className="container">
        <Outlet />
      </div>
      </main>
      <TheFooter />
    </>
  )
}

export default RootLayout