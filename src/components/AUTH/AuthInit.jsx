import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { account } from "./lib/appwrite";
import { loginSuccess, logout } from "../../store/authSlice";

const AuthInit = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
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
        if (!cancelled) dispatch(logout());
        if (err.code !== 401) console.error("AuthInit Error:", err);
      }
    })();

    return () => { cancelled = true; };
  }, [dispatch]);

  return children;
};

export default AuthInit;