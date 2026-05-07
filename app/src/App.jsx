import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom"

// make sure to add new pages here for routing
import Dashboard from "./pages/Dashboard/Dashboard"

import Orders from "./pages/Orders/Orders"
import OrdersDefault from "./pages/Orders/OrdersDefault"
import Customers from "./pages/Orders/Customers/Customers"
import CustomerDetails from "./pages/Orders/Customers/CustomerDetails"
import DataEntry from "./pages/Orders/Customers/DataEntry"
import PaymentHistory from "./pages/Orders/Customers/PaymentHistory"
import SalesHistory from "./pages/Orders/Customers/SalesHistory"
import SalesOrders from "./pages/Orders/SalesOrders/SalesOrders"
import SalesOrderDetails from "./pages/Orders/SalesOrders/SalesOrderDetails"
import Invoices from "./pages/Orders/Invoices/Invoices"
import InvoiceDetails from "./pages/Orders/Invoices/InvoiceDetails"
import OrderPayments from "./pages/Orders/OrderPayments/OrderPayments"
import OrderPaymentDetails from "./pages/Orders/OrderPayments/OrderPaymentDetails"
import CreditReturns from "./pages/Orders/CreditReturns/CreditReturns"
import CreditReturnDetails from "./pages/Orders/CreditReturns/CreditReturnDetails"
import Collections from "./pages/Orders/Collections/Collections"
import CollectionDetails from "./pages/Orders/Collections/CollectionDetails"
import InvoiceReturns from "./pages/Orders/InvoiceReturns/InvoiceReturns"
import InvoiceReturnDetails from "./pages/Orders/InvoiceReturns/InvoiceReturnDetails"

import Items from "./pages/Common/Items/Items"
import ItemOrders from "./pages/Common/ItemOrders"

import Purchases from "./pages/Purchases/Purchases"
import PurchasesDefault from "./pages/Purchases/PurchasesDefault"
import Suppliers from "./pages/Purchases/Suppliers/Suppliers"
import SupplierDetails from "./pages/Purchases/Suppliers/SupplierDetails"
import PurchaseOrders from "./pages/Purchases/PurchaseOrders/PurchaseOrders"
import Receive from "./pages/Purchases/Receive/Receive"
import PurchasePayment from "./pages/Purchases/PurchasePayment/PurchasePayment"
import CreditMemo from "./pages/Purchases/CreditMemo/CreditMemo"

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
            <Route path="customers/:customerId" element={<CustomerDetails />}/>
            <Route path="customers/data_entry" element={<DataEntry />}/>
            <Route path="customers/payment_history" element={<PaymentHistory />}/>
            <Route path="customers/sales_history" element={<SalesHistory />}/>

            <Route path="sales_orders" element={<SalesOrders />}/>
            <Route path="sales_orders/:salesOrderId" element={<SalesOrderDetails/>}/>

            <Route path="invoices" element={<Invoices />}/>
            <Route path="invoices/:invoiceId" element={<InvoiceDetails/>}/>

            <Route path="order_payments" element={<OrderPayments />}/>
            <Route path="order_payments/:orderPaymentId" element={<OrderPaymentDetails/>}/>

            <Route path="credit_returns" element={<CreditReturns />}/>
            <Route path="credit_returns/:creditReturnId" element={<CreditReturnDetails />}/>

            <Route path="collections" element={<Collections />}/>
            <Route path="collections/:collectionId" element={<CollectionDetails />}/>

            <Route path="invoice_returns" element={<InvoiceReturns />}/>
            <Route path="invoice_returns/:invoiceReturnId" element={<InvoiceReturnDetails/>}/>
          </Route>

          <Route path="/items" element={<Items />} />
          
          <Route path="/item_orders" element={<ItemOrders />} />

          <Route path="/purchases" element={<Purchases />}>
            <Route index element={<PurchasesDefault/>}/> 
            <Route path="suppliers" element={<Suppliers />}/>
            <Route path="suppliers/:supplierId" element={<SupplierDetails/>}/>
            <Route path="po" element={<PurchaseOrders />}/>
            <Route path="receive" element={<Receive />}/>
            <Route path="purchase_payment" element={<PurchasePayment />}/>
            <Route path="credit_memo" element={<CreditMemo />}/>
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
