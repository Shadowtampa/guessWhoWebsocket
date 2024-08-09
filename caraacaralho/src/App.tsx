import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './router/routes'
import { MyGlobalContext } from './context/UserContext'
import { useState } from 'react'

function App() {

  const [copy, setCopy] = useState<string>("")

  return (
    <>
      <MyGlobalContext.Provider value={{ copy, setCopy }}>
        <RouterProvider router={router} />
      </MyGlobalContext.Provider>
    </>
  )
}

export default App
