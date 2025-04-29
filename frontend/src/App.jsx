import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter } from 'react-router'
import { CreateCustomer, GetCustomer } from './page/Customer'
import { EditCustomer } from './page/EditCustomer'

const App = createBrowserRouter([
  {
    path : '/',
    element: <GetCustomer/>
  },
  {
    path: '/survey/create',
    element: <CreateCustomer/>
  },
  {
    path: '/survey/:id',
    element: <EditCustomer/>
  }
])

export default App
