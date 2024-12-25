# React + Vite

date 07-11-2024 (Library )
error1::
file doesnot exist ->
solution:: pagle to import check karo ki vs code is giving some info about the file or not if not then may be file ki naming me problem ho ya agr wo depencency hai to may be it is not installed in proper way
means Naming convension,,import export statements ka sahi hona,if Dependency then installation..

error2:: import me {} ke andr aur bahar likhne me kya difference??

Fetchiem.jsx` FILE:::

useSelector hook is used to fetch the deta from redux store useSelector(fun>=deta layega)..

exmaple::: const fetchStatus = useSelector((store) => store.fetchStatus);

use of redux store:::
its centralized store which can be accessed by any component. as like we avoid prop drilling fro deeply nested components. and 2nd use is that it can manage those states which will be accessed by multiple components...

Login codeis here with Appwrite
import { useState } from 'react';
import { account, ID } from '../lib/appwrite';

const LoginUser = () => {
const [loggedInUser, setLoggedInUser] = useState(null);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [name, setName] = useState('');

async function login(email, password) {
await account.createEmailPasswordSession(email, password);
setLoggedInUser(await account.get());
}

return (

<div>
<p>
{loggedInUser ? `Logged in as ${JSON.stringify(loggedInUser)}` : 'Not logged in'}
</p>

      <form>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />

        <button type="button" onClick={() => login(email, password)}>
          Login
        </button>

        <button
          type="button"
          onClick={async () => {
            await account.create(ID.unique(), email, password, name);
            login(email, password);
          }}
        >
          Register
        </button>

        <button
          type="button"
          onClick={async () => {
            await account.deleteSession('current');
            setLoggedInUser(null);
          }}
        >
          Logout
        </button>
      </form>
    </div>

);
};

export default LoginUser;

Profile section code hitesh sir here
import { account } from "../lib/appwrite";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";

function Profile() {
const navigate = useNavigate()
const[userDetails,setUserDetails]=useState()

useEffect(()=>{
const getData=account.get()
getData.then(
function(response){
setUserDetails(response)
},
function(error){
console.log(error);
}
)
},[])
const handleLogout=async()=>{

    try {
        await account.deleteSession("current")
        navigate("/")

      } catch (error)
       {
         console.log(error)
      }

}

    return (
    <>
        {userDetails ?(
         <div>
           <p> hello!{userDetails.name}</p>
          <div>
            <button onClick={handleLogout}
            ></button>
          </div>

         </div>

        ) :(
           <p>
            you are not logged in
            <Link to ="/">
            <span>login</span>
            </Link>
           </p>
        )

        }

    </>

);

}
export default Profile;
