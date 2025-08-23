// main.jsx - Remove PersistGate
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import App from './routes/App.jsx'
import Bag from './routes/Bag.jsx'
import Home from './routes/Home.jsx'
import Men from './routes/Men.jsx'
import Admin from './routes/Admin.jsx'
import { Provider } from 'react-redux'
import myntraStore from './store/index.js' // Remove persistor import
import Search from './components/SearchBar/Search_Input.jsx'
import RegisterUser from './components/AUTH/User/RegesterUser.jsx'
import Checkout from './routes/Checkout.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useOnlineStatus from './components/useOnlineStatus.js' 
import PaymentBtn from './components/Payment/PaymentBtn.jsx'
import Success from './routes/Success.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/bag', element: <Bag /> },
      { path: '/menProduct', element: <Men /> },
      { path: '/User', element: <RegisterUser /> },
      { path: '/admin', element: <Admin /> },
      { path: 'Search', element: <Search /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/payment', element: <PaymentBtn /> },
      {path:'/success',element:<Success/>}
    ],
  },
])

const queryClient = new QueryClient()

function RootApp() {
  const isOnline = useOnlineStatus()

  if (!isOnline) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
      }}>
        <h1>🛜 You re Offline</h1>
        <p>Please check your internet connection.</p>
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={myntraStore}>
        {/* ✅ Remove PersistGate - just use RouterProvider directly */}
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootApp />
  </StrictMode>
)

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => console.log('SW registered'))
      .catch((err) => console.error('SW registration failed:', err))
  })
}
