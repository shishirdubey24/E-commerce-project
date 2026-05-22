/* eslint-disable react-refresh/only-export-components */

import { StrictMode, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

import myntraStore from "./store/index.js";

import AuthInit from "./components/AUTH/AuthInit.jsx";
import useOnlineStatus from "./components/useOnlineStatus.js";



const App = lazy(() => import("./routes/App.jsx"));
const Home = lazy(() => import("./routes/Home.jsx"));
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

const AdminData = lazy(() =>
  import("./components/Admin/Dropdown/AdminData.jsx"),
);

const Categories = lazy(() =>
  import("./components/Admin/Dropdown/Categories.jsx"),
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

/* LOADER */

function PageLoader() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <p className="text-sm font-medium text-gray-600">Loading...</p>
    </div>
  );
}

/* ROUTER */

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
        <App />
      </Suspense>
    ),

    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },

      {
        path: "/bag",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Bag />
          </Suspense>
        ),
      },

      {
        path: "/User/SignUp",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SignUp />
          </Suspense>
        ),
      },

      {
        path: "User/SignIn",
        element: (
          <Suspense fallback={<PageLoader />}>
            <LoginUser />
          </Suspense>
        ),
      },

      {
        path: "/Account",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Account />
          </Suspense>
        ),
      },

      {
        path: "/admin",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Admin />
          </Suspense>
        ),
      },

      {
        path: "Search",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Search />
          </Suspense>
        ),
      },

      {
        path: "/checkout",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Checkout />
          </Suspense>
        ),
      },

      {
        path: "/payment",
        element: (
          <Suspense fallback={<PageLoader />}>
            <PaymentBtn />
          </Suspense>
        ),
      },

      {
        path: "/success",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Success />
          </Suspense>
        ),
      },

      {
        path: "/category/:name",
        element: (
          <Suspense fallback={<PageLoader />}>
            <CategoryPage />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/admin",

    element: (
      <Suspense fallback={<PageLoader />}>
        <Admin />
      </Suspense>
    ),

    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
        ),
      },

      {
        path: "products",
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminData />
          </Suspense>
        ),
      },

      {
        path: "categories",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Categories />
          </Suspense>
        ),
      },

      {
        path: "customers",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Customers />
          </Suspense>
        ),
      },

      {
        path: "settings",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Settings />
          </Suspense>
        ),
      },
    ],
  },
]);

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