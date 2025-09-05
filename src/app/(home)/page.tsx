
"use client"; 

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  initializeToken,
  setTokenValue,

} from "../actions/tokenSlice"; 
const CREDIT_COSTS = {
  IMAGE_GENERATION: 5,
  IMAGE_BACKGROUND_REMOVAL: 10,
  IMAGE_RESIZER: 10,
  IMAGE_OPTIMIZER: 7,
};
const Page = () => {
  const dispatch = useDispatch();
  
  const {
    token: currentCredits,
    loading: tokenLoading,
    error: tokenError,
    
  } = useSelector((state: any) => state.token);

  const [isGenerating, setIsGenerating] = useState(false); 
  const [pageError, setPageError] = useState(null); 

 
  useEffect(() => {
    async function fetchUserCredits() {
 
     
      try {
        const response = await fetch("/api/user");
        const responseData = await response.json();

        if (!response.ok) {
         
          throw new Error(
            responseData.error || `API Error: ${response.status}`
          );
        }

 
        if (responseData && typeof responseData.credits === "number") {
        
          dispatch(initializeToken(responseData.credits));
        } else {
          console.error("Invalid user data format received:", responseData);
          throw new Error("Received invalid user data.");
        }
      } catch (error) {
        console.error("Error initializing credits:", error);
      
      }
    }

    fetchUserCredits();
  }, [dispatch]); 


  const handleGenerateClick = async () => {
   
    const creditsToUse = CREDIT_COSTS.IMAGE_GENERATION;
    const featureName = "Image Generation"; 


    if (currentCredits < creditsToUse) {
     console.warn("Insufficient credits for image generation.");
      return;
    }

    setIsGenerating(true); 
    setPageError(null); 


    try {

      const imageGenerationResponse = await fetch("/api/serverActions", {
   
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feature: featureName, 
          useCredit: creditsToUse,
        }),
      });

      const responseData = await imageGenerationResponse.json(); 

      if (imageGenerationResponse.ok) {
     
        dispatch(setTokenValue(responseData.credits));
        alert(
          `Image generated successfully! Remaining credits: ${responseData.credits}`
        );
      } else {
   
        const errorMessage =
          responseData.error || `API Error: ${imageGenerationResponse.status}`;
        console.error("API Error during image generation:", errorMessage);
        setPageError(errorMessage); 
       
       
      }
    } catch (error) {
    
      console.error("Network or Parsing Error during image generation:", error);
     
    
    } finally {
      setIsGenerating(false); 
    }
  };

  const isLoadingInitial = tokenLoading === "pending";
  const hasTokenError = tokenError !== null;

  return (
    <div className="p-4">
      {" "}
   
      <h1 className="text-2xl font-bold mb-4">Image Generation</h1>
      <Button
        onClick={handleGenerateClick}
        >Generate</Button>
    </div>
  );
};

export default Page;
