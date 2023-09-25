import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import myImage from "../assets/img2.jpg";

export const TopTracks = () => {
  const [topTracks, setTopTracks] = useState([]);
  const [data, setData] = useState([]);
  //const imges = new Map();
  const [imges, setImges] = useState(new Map());

  const [ids, setIds] = useState([]);
  const [activeButton, setActiveButton] = useState("short_term");

  const fetchData = async (timeRange) => {
    const ACCESS_TOKEN = Cookies.get("access_token");
    try {
      const response = await axios.get("/mytop/test", {
        params: {
          time_range: timeRange,
        },
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      setData(response.data);

      const extractedIds = response.data.map((key) => key.id);
      setIds(extractedIds);
      //console.log("Extracted id: ", extractedIds);
      //console.log("data: ", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchimges = async () => {
    const ACCESS_TOKEN = Cookies.get("access_token");

    try {
      const imageRequests = ids.map(async (key) => {
        const response = await axios.get("/mytop/getimg", {
          params: {
            id: key,
          },
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });

        return { name: response.data.name, imgUrl: response.data.img[0] };
      });

      const images = await Promise.all(imageRequests);

      const updatedImages = new Map();
      images.forEach((item) => {
        updatedImages.set(item.name, item.imgUrl);
      });

      setImges(updatedImages);
    } catch (error) {
      console.error("Error fetching data fetchImages:", error);
    }
  };

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const ACCESS_TOKEN = Cookies.get("access_token");
        //console.log("Access token from toptracks.js: " + ACCESS_TOKEN);
        const headers = {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        };

        const response = await axios.get("/mytop/topTracks", { headers });
        setTopTracks(response.data);
      } catch (error) {
        console.error("Error fetching data client:", error);
      }
    };

    fetchTopTracks();
    fetchData("short_term"); //default data
  }, []);

  useEffect(() => {
    if (ids.length > 0) {
      fetchimges();
    }
  }, [ids]);

  return (
    <div className="min-h-screen w-screen bg-gray-200 flex flex-col items-center">
      <div className="relative h-48 w-3/4 mt-8">
        <img
          src={myImage}
          alt="image"
          className="object-cover object-center h-full w-full rounded-xl"
          style={{ width: "75vw" }}
        />
        <h1 className="absolute bottom-0 left-0 text-3xl font-bold underline p-4 text-white">
          Your Top Tracks
        </h1>
      </div>
      <div className="w-3/5 mt-4">
        <div className="flex justify-center space-x-4">
          <button
            className={`border rounded-lg px-6 py-3 text-gray-700 hover:bg-gray-100 focus:outline-none ${
              activeButton === "short_term" ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => {
              setActiveButton("short_term");
              fetchData("short_term");
            }}
          >
            Last Month
          </button>
          <button
            className={`border rounded-lg px-6 py-3 text-gray-700 hover:bg-gray-100 focus:outline-none ${
              activeButton === "medium_term" ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => {
              setActiveButton("medium_term");
              fetchData("medium_term");
            }}
          >
            Last 6 Months
          </button>
          <button
            className={`border rounded-lg px-6 py-3 text-gray-700 hover:bg-gray-100 focus:outline-none ${
              activeButton === "long_term" ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => {
              setActiveButton("long_term");
              fetchData("long_term");
            }}
          >
            All Time
          </button>
        </div>
      </div>
      <div className="w-3/5 mt-4">
        <ul className="text-left divide-y divide-gray-300">
          {data &&
            data.map((item, index) => (
              <li key={index} className="py-4 flex items-center space-x-4">
                {imges.has(item.name) && (
                  <img
                    src={imges.get(item.name)}
                    alt={item.name}
                    className="w-14 h-14 rounded-full"
                  />
                )}
                <span className="text-lg font-medium text-gray-800">
                  {item.name}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
  
};
