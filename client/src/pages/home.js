import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you use React Router for navigation
import Cookies from "js-cookie";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

export const Home = () => {
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    axios
      .get("/auth/login")
      .then((response) => {
        console.log("success logining in: ", response.data);
        // Redirect the user to the Spotify authorization URL
        window.location.href = response.data.authorizationURL;
        //navigate(response.data.authorizationURL);
      })
      .then(() => {
        const accessToken = Cookies.get("access_token");
        if (accessToken) {
          navigate("/mytop/TopTracks");
          //alert("login successful");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen font-sans">
      <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-md p-8 space-y-4">
        <h2 className="text-xl font-semibold text-center mb-4">
          See your Spotify Wrapped now
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Your top tracks and artists all in one place
        </p>
        <button
          className="w-full py-3 px-6 text-base font-medium rounded-full text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center"
          onClick={handleSubmit}
        >
          <FontAwesomeIcon icon={faSpotify} className="w-6 h-6 mr-3" />
          Login to Spotify
        </button>
      </div>
    </div>
  );
    
};
