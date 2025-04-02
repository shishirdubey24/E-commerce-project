
/* eslint-disable no-unused-vars */
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not defined in the environment.");
  }
  console.log("VITE_GEMINI_API_KEY", apiKey);
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
   
  } catch (error) {
    console.error("Error initializing Gemini:", error)
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
   export  const AIchatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
    console.log("Chat Session created:", AIchatSession);
  
  
  