import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersLine } from "@fortawesome/free-solid-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  const accessToken = Cookies.get("access_token");
  const navigate = useNavigate();
  const [tokenExpired, setTokenExpired] = useState(false);
  const tokenCreationTime = parseInt(Cookies.get("tokenCreationTime"));
  const tokenLifetimeInSeconds = parseInt(Cookies.get("spotifyExpiry"));

  const location = useLocation();
  const isActive = location.pathname === "/mytop/TopTracks";
  const showNavbar = useLocation().pathname !== "/";

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("spotifyExpiry");
    window.localStorage.clear();
    navigate("/");
  };

  const expiredToken = () => {
    const currentTime = parseInt(Date.now());
    if (currentTime >= tokenCreationTime + tokenLifetimeInSeconds * 1000) {
      console.log("Timer has expired!");
      setTokenExpired(true);
      logout();
    } else {
      const remainingTime = tokenCreationTime + tokenLifetimeInSeconds * 1000 - currentTime;
      console.log("token expires in: ", remainingTime);
    }
  };

  useEffect(() => {
    expiredToken();
    const tokenCheckInterval = setInterval(() => {
      expiredToken();
    }, 60000); // Check every minute (60000 milliseconds)

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(tokenCheckInterval);
    };
  }, []);

  const handleRefreshOrNavigate = () => {
    if (location.pathname === "/mytop/TopTracks") {
      window.location.reload();
    } else {
      window.location.href = "/mytop/TopTracks";
    }
  };

  const handleRefreshOrNavigate2 = () => {
    if (location.pathname === "/mytop/topArtists") {
      window.location.reload();
    } else {
      window.location.href = "/mytop/topArtists";
    }
  };

  // Render the Navbar only if showNavbar is true
  return showNavbar ? (
    <div className="h-screen w-32 bg-white-800 text-black">
      <div className="fixed top-0 left-5 bg-white w-30 h-30 p-4 pl-5 pt-10">
        <button onClick={handleRefreshOrNavigate} className="focus:outline-none">
          <FontAwesomeIcon icon={faMusic} className="w-8 h-8" />
        </button>
      </div>

      <div className="fixed top-20 left-5 bg-white w-30 h-30 p-4 pl-5 pt-10">
      <button onClick={handleRefreshOrNavigate2} className="focus:outline-none">
          <FontAwesomeIcon icon={faUsersLine} className="w-10 h-10" />
        </button>
      </div>

      <div className="fixed bottom-0 left-5 bg-white w-30 p-4 ">
        {!accessToken || tokenExpired ? (
          <Link to="/"></Link>
        ) : (
          <button onClick={logout}> Logout </button>
        )}
      </div>
    </div>
  ) : null;
};
