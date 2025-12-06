/* eslint-disable react-refresh/only-export-components */
// main.jsx

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

// Root layout + routes
import App from "./routes/App.jsx";
import Home from "./routes/Home.jsx";
import Bag from "./routes/Bag.jsx";
import Admin from "./routes/Admin.jsx";
import Checkout from "./routes/Checkout.jsx";
import Success from "./routes/Success.jsx";
import CategoryPage from "./routes/CategoryPage.jsx";

// Store
import myntraStore from "./store/index.js";

// Auth
import RegisterUser from "./components/AUTH/User/RegesterUser.jsx";
import LoginUser from "./components/AUTH/User/LoginUser.jsx";

// Admin children
import Dashboard from "./components/Admin/Dashboard/Dashboard.jsx";
import AdminData from "./components/Admin/Dropdown/AdminData.jsx";
import Categories from "./components/Admin/Dropdown/Categories.jsx";
import Customers from "./components/Admin/Dropdown/Customers.jsx";
import Settings from "./components/Admin/Dropdown/Settings.jsx";

// Other components
import Search from "./components/SearchBar/Search_Input.jsx";
import PaymentBtn from "./components/Payment/PaymentBtn.jsx";
import useOnlineStatus from "./components/useOnlineStatus.js";

// Router configuration

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/bag", element: <Bag /> },
      // { path: '/menProduct', element: <Men /> },
      { path: "/User/register", element: <RegisterUser /> },
      { path: "User/login", element: <LoginUser /> },
      { path: "/admin", element: <Admin /> },
      { path: "Search", element: <Search /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/payment", element: <PaymentBtn /> },
      { path: "/success", element: <Success /> },
      { path: "/category/:name", element: <CategoryPage /> },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "products", element: <AdminData /> },
      { path: "categories", element: <Categories /> },
      { path: "customers", element: <Customers /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

// Query client

const queryClient = new QueryClient();


// Offline screen


function OfflineScreen() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <h1>🛜 You re Offline</h1>
      <p>Please check your internet connection.</p>
    </div>
  );
}

// Root app

function RootApp() {
  const isOnline = useOnlineStatus();

  if (!isOnline) {
    return <OfflineScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={myntraStore}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  );
}

// Render

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RootApp />
  </StrictMode>
);

// Service worker

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("SW registered"))
      .catch((err) => console.error("SW registration failed:", err));
  });
}
