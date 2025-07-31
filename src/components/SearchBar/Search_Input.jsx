import { useState, useEffect } from "react";
import {AIchatSession} from "./config/GeminiAI"
import { useLocation } from "react-router-dom";
import User from "./TrimmedSearch";

const Search = () => {
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const searchQuery = location.state?.query || "";

  const fetchAIResponse = async () => {
    const PROMPT = `
      Given the following search query from a user: "${searchQuery}", identify the most relevant item, product category, or keyword that captures the user's intent.
      Be flexible — the input may contain typos, extra descriptions, emotional phrases, or comparisons.
      Return only the interpreted item name or keyword you'd recommend searching for.
      Examples:
      - "looking for trendy men's black running shoes" → "running shoes"
      - "need something like AirPods but cheaper" → "wireless earbuds"
      - "can you find me a laptop for video editing?" → "video editing laptop"
    `;

    try {
      setIsLoading(true);
      const result = await AIchatSession.sendMessage(PROMPT);
      const summary = result.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "No meaningful result";
      setAiResponse(summary);
    } catch (error) {
      console.error("Error generating AI response:", error);
      setAiResponse("Could not understand the query. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchAIResponse();
    }
  }, [searchQuery]);

  return (
    <>
      {isLoading ? (
        <div>🔍 Analyzing your search query...</div>
      ) : (
        <User prop={aiResponse} />
      )}
    </>
  );
};

export default Search;
