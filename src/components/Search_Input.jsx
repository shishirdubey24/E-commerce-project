/* eslint-disable react/prop-types */
import {AIchatSession} from "../Config/Gemini-Ai";
const Search=({searchQuery})=>{
  const data = searchQuery?.value || searchQuery;
  console.log("Searching",AIchatSession)

    return(
        <>
        <h1> {data}</h1>
        
        </>
    )
}
export default Search;