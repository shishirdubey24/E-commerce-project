
import { StrictMode } from 'react'
import  ReactDOM  from 'react-dom/client'
import {  RouterProvider,createBrowserRouter } from 'react-router-dom'
import './index.css'
import App from './routes/App.jsx'
import Bag from './routes/Bag.jsx';
import Home from './routes/Home.jsx'
import Men from './routes/Men.jsx'
import Admin from './routes/Admin.jsx'
//import RegesterUser from './components/RegesterUser.jsx'
//import LoginUser from './components/LoginUser.jsx'
//import Profile from './components/Profile.jsx'
//import VerifyEmail from './components/verifyUser.jsx'
import { Provider } from 'react-redux'
import myntraStore from './store/index.js'
import Search from './components/Search_Input.jsx'
import RegisterUser from './components/RegesterUser.jsx'
import Checkout from './components/Checkout.jsx'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
 const router= createBrowserRouter([
{
  path: '/',
  element: <App />,
  children:[
    {path: "/",element:<Home/>/*,loader:postLoader*/},
    {
      path:"/bag",
      element:<Bag/>,
     /* action:createPostAction,*/
    },
    {path:"/menProduct",
      element:<Men/>,
      },
     
      {path:"/User",element:<RegisterUser/>},
     {path:"/adminPannel",element:<Admin/>},
     {path: "Search",element:<Search/>},
     {path:"/checkout",element:<Checkout/>}
  ],
},
 ])
 const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <Provider store={myntraStore}>
   <RouterProvider router={router}
   />
   </Provider>
   </QueryClientProvider>
  </StrictMode>,
)
