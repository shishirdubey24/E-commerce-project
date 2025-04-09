import { useState, useRef, useEffect } from "react";
import { account, ID, databases } from "../lib/appwrite";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../store/authSlice";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [isSignedIn, setSignedIn] = useState(true);
  const [errormsg, setErrormsg] = useState(null);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.get();
        console.log("User session:", session);
        setUser(session);
        dispatch(loginSuccess(session));
      } catch (error) {
        console.log("No active session found", error);
        setUser(null);
      }
    };

    checkSession();
  }, [dispatch]);

  const handleSignupToggle = () => {
    setSignedIn(!isSignedIn);
    setErrormsg(null);
  };

  const handleBtnClick = async (e) => {
    e.preventDefault();
    setErrormsg(null);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const name = nameRef.current?.value;
    const phone = phoneRef.current?.value;

    if (!email || !password || (!isSignedIn && (!name || !phone))) {
      setErrormsg("Please fill in all required fields.");
      return;
    }

    if (!isSignedIn) {
      // Signup Process
      try {
        const response = await account.create(ID.unique(), email, password, name);
        console.log("User created:", response);

        const verificationToken = Math.random().toString(36).substr(2, 10);
        const documentId = ID.unique();

        await databases.createDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID,
          documentId,
          {
            userId: response?.$id || "fallback-user-id",
            email,
            isVerified: false,
            verificationToken,
          }
        );

        // Switch to Sign In mode after successful sign-up
        setSignedIn(true);
        setErrormsg("Signup successful. Please sign in now.");

      } catch (error) {
        console.error("Signup Error:", error);
        setErrormsg(error.message || "Signup failed. Please try again.");
      }
    } else {
      // Login Process
      try {
        const response = await account.createEmailPasswordSession(email, password);
        console.log("Login successful:", response);

        const userSession = await account.get();
        setUser(userSession);
        dispatch(loginSuccess(userSession));
        navigate("/");
      } catch (error) {
        console.error("Login Error:", error);
        setErrormsg("Invalid email or password.");
      }
    }
  };

  const handleLogoutUser = async () => {
    try {
      await account.deleteSession("current");
      console.log("Logout successful");
      setUser(null);
      dispatch(logout());
      localStorage.clear();
      navigate("/User");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div style={styles.loginContainer}>
      <h2 style={styles.heading}>User {isSignedIn ? "Login" : "Registration"}</h2>
      <form onSubmit={handleBtnClick} style={styles.formContainer}>
        <h1 style={styles.formTitle}>{isSignedIn ? "Sign In" : "Sign Up"}</h1>

        {!isSignedIn && (
          <>
            <input ref={nameRef} type="text" placeholder="Full Name" style={styles.inputField} />
            <input ref={phoneRef} type="tel" placeholder="Phone Number" style={styles.inputField} />
          </>
        )}

        <input ref={emailRef} type="email" placeholder="Email Address" style={styles.inputField} />
        <input ref={passwordRef} type="password" placeholder="Enter Password" style={styles.inputField} />

        {errormsg && <p style={styles.errorText}>{errormsg}</p>}

        <button style={styles.submitBtn} type="submit">
          {isSignedIn ? "Sign In" : "Sign Up"}
        </button>

        <p style={styles.toggleText} onClick={handleSignupToggle}>
          {isSignedIn ? "New here? Sign up now!" : "Already registered? Sign in now!"}
        </p>

        {user && (
          <button style={styles.logoutBtn} type="button" onClick={handleLogoutUser}>
            Logout
          </button>
        )}
      </form>
    </div>
  );
};

const styles = {
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  formContainer: {
    width: "350px",
    padding: "20px",
    backgroundColor: "black",
    color: "white",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  formTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "15px",
  },
  inputField: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
  errorText: {
    color: "red",
    fontSize: "14px",
    textAlign: "center",
    margin: "5px 0",
  },
  submitBtn: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#ff4b5c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
  },
  toggleText: {
    textAlign: "center",
    color: "white",
    cursor: "pointer",
    marginTop: "15px",
  },
  logoutBtn: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
  },
};

export default RegisterUser;
