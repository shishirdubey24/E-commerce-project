
import { useState, useEffect } from "react";
import { AIchatSession } from "../Config/Gemini-Ai";
import { useLocation } from "react-router-dom";
import User from "./UserSearch";
const Search = () => {
  const [aiResponse, setAiResponse] = useState(""); // State to store AI response
  const location = useLocation();
  const searchQuery = location.state?.query || "";
  // Function to call AI and get the response
  const fetchAIResponse = async () => {
    const PROMPT = `item_name:${searchQuery} Extract the main item name or keyword from the user's input. The input may include additional words, phrases, or descriptions, such as adjectives or context. Focus on identifying the most relevant term that represents the product or category. Ignore unrelated words or phrases.`;
    try {
      const result = await AIchatSession.sendMessage(PROMPT);

      // Log the full response to inspect the structure
      console.log("Message Object:", result);

      // Access the generated summary from the correct path
      const summary = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      setAiResponse(summary); // Update state with AI response
      console.log("Extracted search", summary);
    } catch (error) {
      console.error("Error generating summary:", error);
      setAiResponse("Error generating response"); // Handle error state
    }
  };

  // useEffect to fetch AI response when the component mounts or `data` changes
  useEffect(() => {
    if (searchQuery) {
      fetchAIResponse();
    }
  }, [searchQuery]);
 console.log("Search field is ", searchQuery)
 console.log("aires",aiResponse)
  return (
    <>
    {aiResponse ? (
      <User prop={aiResponse} />
    ) : (
      <div>Loading AI re</div>
    )}  
    </>
  );
};

export default Search;
