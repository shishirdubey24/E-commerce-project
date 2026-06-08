/* eslint-disable react-refresh/only-export-components */

import { StrictMode, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import axios from "axios";
import myntraStore from "./store/index.js";

import AuthInit from "./components/AUTH/AuthInit.jsx";
import useOnlineStatus from "./components/useOnlineStatus.js";
import ProtectedRoute from "./components/AUTH/ProtectedRoute.jsx";


axios.defaults.withCredentials = true;
import App from "./routes/App.jsx";
import Home from "./routes/Home.jsx";
const Bag = lazy(() => import("./routes/Bag.jsx"));
const Admin = lazy(() => import("./routes/Admin.jsx"));
const Checkout = lazy(() => import("./routes/Checkout.jsx"));
const Success = lazy(() => import("./routes/Success.jsx"));
const CategoryPage = lazy(() => import("./routes/CategoryPage.jsx"));
const Account = lazy(() => import("./routes/Accounts.jsx"));

/* AUTH */

const SignUp = lazy(() =>
  import("./components/AUTH/User/SignUp.jsx"),
);

const LoginUser = lazy(() =>
  import("./components/AUTH/User/LoginUser.jsx"),
);

/* ADMIN */

const Dashboard = lazy(() =>
  import("./components/Admin/Dashboard/Dashboard.jsx"),
);

const Categories = lazy(() =>
  import("./components/Admin/Dropdown/Categories.jsx"),
);
const ProductsData=lazy(()=>
  import ("./components/Admin/Dropdown/Products.jsx"),
); 
const Customers = lazy(() =>
  import("./components/Admin/Dropdown/Customers.jsx"),
);

const Settings = lazy(() =>
  import("./components/Admin/Dropdown/Settings.jsx"),
);

/* OTHER */

const Search = lazy(() =>
  import("./components/SearchBar/Search_Input.jsx"),
);

const PaymentBtn = lazy(() =>
  import("./components/Payment/PaymentBtn.jsx"),
);

/* QUERY CLIENT */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30_000,
    },
  },
});





/* ROUTER */

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      // ==========================================
      // PUBLIC CONSUMER VIEWPORTS
      // ==========================================
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/bag",
        element: <Bag />,
      },
      {
        path: "/User/SignUp",
        element: <SignUp />,
      },
      {
        path: "/User/SignIn",
        element: <LoginUser />,
      },
      {
        path: "Search",
        element: <Search />,
      },
      {
        path: "/category/:name",
        element: <CategoryPage />,
      },

      // ==========================================
      // PROTECTED CUSTOMER CHECKOUT FUNNEL
      // ==========================================
      {
        element: <ProtectedRoute />, // Validates core context authentication state
        children: [
          {
            path: "/Account",
            element: <Account />,
          },
          {
            path: "/checkout",
            element: <Checkout />,
          },
          {
            path: "/payment",
            element: <PaymentBtn />,
          },
          {
            path: "/success",
            element: <Success />,
          },
        ],
      },
    ],
  },

  // ==========================================
  // SECURE ADMINISTRATIVE ARCHITECTURE BRANCH
  // ==========================================
 {
    path: "/admin",
    element: <Admin />, // This handles BOTH security and layout
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <ProductsData />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
],{
  future:{
    v7_startTransition: true,
  },
}
);

/* OFFLINE SCREEN */

function OfflineScreen() {
  return (
    <div className="h-screen flex flex-col items-center justify-center font-sans">
      <h1 className="text-2xl font-bold">🛜 You are Offline</h1>
      <p className="mt-2 text-gray-600">
        Please check your internet connection.
      </p>
    </div>
  );
}

/* ROOT APP */

function RootApp() {
  const isOnline = useOnlineStatus();

  if (!isOnline) {
    return <OfflineScreen />;
  }

  return (
    <Provider store={myntraStore}>
      <QueryClientProvider client={queryClient}>
        <AuthInit>
          <RouterProvider router={router} />
        </AuthInit>
      </QueryClientProvider>
    </Provider>
  );
}

/* RENDER */

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
);

/* SERVICE WORKER */

if (import.meta.env.PROD && "serviceWorker" in navigator) {
window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("SW registered"))
      .catch((err) => console.error("SW registration failed:", err));
  });
}