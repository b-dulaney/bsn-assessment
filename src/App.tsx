import Navbar from './components/navbar/navbar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
