import Navbar from './components/navbar/navbar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default App
