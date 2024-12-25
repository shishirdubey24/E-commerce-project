import { useState } from 'react';
import { account, ID,databases } from '../lib/appwrite';
import { useNavigate } from 'react-router';
import { sendVerificationEmail } from '../lib/emailservice';
const RegesterUser = () => {
 const navigate=useNavigate();
  const[User,setUser]=useState({
    email: '',
    password: '',
    name: '',
  })
  const SignupUser=async (e)=>{
    e.preventDefault();
    try {
      const response = account.create(ID.unique(), User.email, User.password, User.name)
      console.log(response);
         // Generate a verification token
         const verificationToken = Math.random().toString(36);
       const documentId = ID.unique(); // Appwrite-generated unique ID
console.log("Generated Document ID:", documentId);
    await databases.createDocument(
      "6750024e001032a5e035",
      "675713d00023b4077065",
      documentId, // Pass the generated or custom document ID
  {
    userId: response?.$id || "fallback-user-id", // If response.$id is undefined, use a fallback
    email: User.email,
    isVerified: false,
    verificationToken: verificationToken,
  }
    );
  

       // Send the verification email
     //  await account.createVerification("http://localhost:5173/verify");     
       await sendVerificationEmail(User.email, verificationToken);

      alert('A verification email has been sent. Please verify your email before logging in.');
      navigate("/profile");
    }
    catch(error){
      console.log(error); // Failure
    }
  }
   return(
    <div className="login-container form">
    <h2>User Registration</h2>
    <form onSubmit={SignupUser} >
      {/* Name Field */}
      <div >
        <label >Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
         
          onChange={(e)=>{
            setUser({...User,name:e.target.value})
          }}
          placeholder="Enter your name"
          required
        />
      </div>

      {/* Email Field */}
      <div >
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          
          onChange={(e)=>{
            setUser({ ...User, email: e.target.value })
          }}
          placeholder="Enter your email"
          required
        />
      </div>

     
      {/* Password Field */}
      <div>
        <label >Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
         
          onChange={(e)=>{
            setUser({...User,password:e.target.value})
          }}
          placeholder="Enter your password"
          required
        />
      </div>

      {/* Phone Number Field */}
     

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
   )
 
}

export default RegesterUser;
