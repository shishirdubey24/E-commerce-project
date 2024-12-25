import { account } from "../lib/appwrite";
import { useState,  } from "react";
import { useNavigate } from "react-router";

const LoginUser = () => {
 
  const navigate = useNavigate();

  const [User, setUser] = useState({ email: "", password: "" });
//check state updation for login user and password 


const handleLogoutUser = async () => {
  try {
    const session = await account.getSession('current');  // Check if session exists
    if (session) {
      const response = await account.deleteSession('current');  // Delete session if exists
      console.log('Logout successful:', response);
       // Check again after logout to see if the session is really deleted
       const checkSession = await account.getSession('current');
       if (!checkSession) {
         console.log('Session has been deleted!');
       }
    } else {
      console.log('No session found. User is already logged out.');
    }
    
    // Clear localStorage
    localStorage.clear();
    navigate('/profile'); // Redirect after logout
  } catch (error) {
    console.error('Logout error:', error);
  }
  setUser(null);
};

  const handleLoginUser = async (e) => {
    e.preventDefault();
    console.log("User created");
    try {
      const response = await account.createEmailPasswordSession(User.email, User.password);
      console.log("Login successful:", response);
        navigate("/");
    } catch (error) {
      console.log("Error in login :", error); 
    }
    
  };

  return (
    <div className="login-container form">
    <h2>Login Form</h2>
    <form >
      <div >
        <label>Email:</label>
        <input
          type="email"
         className=" form-control"
          onChange={(e)=>{
            setUser({ ...User, email: e.target.value })
          }}
          placeholder="Enter your email"
          required
        />
      </div>
      <div >
        <label>Password:</label>
        <input
          type="password"
           className=" form-control"
          onChange={(e)=>{
            setUser({...User,password:e.target.value})
          }}
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="butn"> 
      <button type="button" className="btn btn-primary" onClick={handleLoginUser}>Submit</button>
      <button type="button" className="btn btn-primary" onClick={handleLogoutUser}>Logout</button>
      </div>
    
    </form>
  </div>
);
};

export default LoginUser;
