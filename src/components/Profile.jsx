import { useState } from "react";
import LoginUser  from "./LoginUser";
import RegesterUser from  "./RegesterUser";

const Profile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);        
        setIsSigningUp(false);
    };

    const handleSignup = () => {
        console.log("Signup button clicked");
        setIsSigningUp(true);
        setIsLoggedIn(false);
    };

    return (
        <>
        <div className="profile-button"> 
        <button type="button" className="btn btn-primary" onClick={handleLogin}>Login/logout</button>
        <button type="button" className="btn btn-primary" onClick={handleSignup}>regester</button>

        </div>
         
            {!isLoggedIn && !isSigningUp && <p>Please log in or sign up.</p>}
            {isLoggedIn && <LoginUser  />}
            {isSigningUp && <RegesterUser />}
        </>
    );
};

export default Profile;