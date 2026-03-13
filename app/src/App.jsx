import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard/Dashboard"
import Orders from "./pages/Orders/Orders"
import Purchases from "./pages/Purchases/Purchases"
import Expenses from "./pages/Expenses/Expenses"
import Reports from "./pages/Reports/Reports"
import Header from './components/Header'
import NotFound from "./pages/NotFound"

function App() {

  return (
      <BrowserRouter>

        <Header />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/reports" element={<Reports />} />

          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </BrowserRouter>
  )
}

export default App
