import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard/Dashboard"

import Orders from "./pages/Orders/Orders"
import OrdersDefault from "./pages/Orders/OrdersDefault"
import Customers from "./pages/Orders/Customers/Customers"
import List from "./pages/Orders/Customers/List"
import DataEntry from "./pages/Orders/Customers/DataEntry"
import PaymentHistory from "./pages/Orders/Customers/PaymentHistory"
import SalesHistory from "./pages/Orders/Customers/SalesHistory"
import SalesOrders from "./pages/Orders/SalesOrders/SalesOrders"

import Purchases from "./pages/Purchases/Purchases"
import PurchasesDefault from "./pages/Purchases/PurchasesDefault"

import Expenses from "./pages/Expenses/Expenses"
import ExpensesDefault from "./pages/Expenses/ExpensesDefault"

import Reports from "./pages/Reports/Reports"

import Header from './components/Header'
import NotFound from "./pages/NotFound"

function App() {

  return (
      <BrowserRouter>

        <Header />

        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/orders" element={<Orders />}>
            <Route index element={<OrdersDefault/>}/> 
            <Route path="customers" element={<Customers />}/>
            <Route path="customers/list" element={<List />}/>
            <Route path="customers/data_entry" element={<DataEntry />}/>
            <Route path="customers/payment_history" element={<PaymentHistory />}/>
            <Route path="customers/sales_history" element={<SalesHistory />}/>
            <Route path="sales_orders" element={<SalesOrders />}/>
          </Route>

          <Route path="/purchases" element={<Purchases />}>
            <Route index element={<PurchasesDefault/>}/> 
          </Route>

          <Route path="/expenses" element={<Expenses />}>
            <Route index element={<ExpensesDefault/>}/> 
          </Route>

          <Route path="/reports" element={<Reports />} />

          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </BrowserRouter>
  )
}

export default App
