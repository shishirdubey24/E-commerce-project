
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
import Profile from './components/Profile.jsx'
//import VerifyEmail from './components/verifyUser.jsx'
import { Provider } from 'react-redux'
import myntraStore from './store/index.js'

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
     // {path:"/RegesterUser",
      //  element:<RegesterUser/>,
     // },
    //  {path:"/LoginUser", element:<LoginUser/>,
     // },
      {path:"/Profile",element:<Profile/>},
     // {path:"/verify",element:<VerifyEmail/>},
     {path:"/adminPannel",element:<Admin/>},
    
  ],
},
 ])
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={myntraStore}>
   <RouterProvider router={router}
   />
   </Provider>
  </StrictMode>,
)
