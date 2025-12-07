// src/components/AUTH/AuthInit.jsx

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { account } from "./lib/appwrite"; // path is from /components/AUTH
import { loginSuccess, logout } from "../../store/authSlice";

const AuthInit = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // Will succeed if session cookie exists, throw if not authenticated
        const userSession = await account.get();

        if (cancelled) return;

        const isAdmin =
          (Array.isArray(userSession.labels) &&
            userSession.labels.includes("admin")) ||
          userSession.prefs?.role === "admin";

        dispatch(
          loginSuccess({
            id: userSession.$id,
            name: userSession.name || "",
            email: userSession.email || "",
            isAdmin,
          })
        );
      } catch (err) {
        if (!cancelled) {
          dispatch(logout());
        }
        console.log(err)
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  return children;
};

export default AuthInit;
