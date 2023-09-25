import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import myImage from "../assets/img2.jpg";

export const TopArtists = () => {
  const [activeButton, setActiveButton] = useState('short_term');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const ACCESS_TOKEN = Cookies.get('access_token');
        const response = await axios.get('/mytop/topArtists', {
          params: {
            time_range: activeButton,
          },
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });

        const newData = response.data.name.map((name, index) => ({
          name,
          imgUrl: response.data.img[index] || '',
        }));
        
        setData(newData);
      } catch (error) {
        console.error('Error fetching data client:', error);
      }
    };

    fetchTopArtists();
  }, [activeButton]);

  const fetchData = async (timeRange) => {
    setActiveButton(timeRange);
  };

  return (
    <div className="min-h-screen w-screen bg-gray-200 flex flex-col items-center">
      <div className="relative h-48 w-3/4 mt-8">
        <img
          src={myImage} // Replace with your image source URL
          alt="image"
          className="object-cover object-center h-full w-full rounded-xl"
          style={{ width: '75vw' }}
        />
        <h1 className="absolute bottom-0 left-0 text-3xl font-bold underline p-4 text-white">
          Your Top Artists
        </h1>
      </div>
      <div className="w-3/5 mt-4">
        <div className="flex justify-center space-x-4">
          <button
            className={`border rounded-lg px-6 py-3 text-gray-700 hover:bg-gray-100 focus:outline-none ${
              activeButton === 'short_term' ? 'border-blue-500' : 'border-transparent'
            }`}
            onClick={() => fetchData('short_term')}
          >
            Last Month
          </button>
          <button
            className={`border rounded-lg px-6 py-3 text-gray-700 hover:bg-gray-100 focus:outline-none ${
              activeButton === 'medium_term' ? 'border-blue-500' : 'border-transparent'
            }`}
            onClick={() => fetchData('medium_term')}
          >
            Last 6 Months
          </button>
          <button
            className={`border rounded-lg px-6 py-3 text-gray-700 hover:bg-gray-100 focus:outline-none ${
              activeButton === 'long_term' ? 'border-blue-500' : 'border-transparent'
            }`}
            onClick={() => fetchData('long_term')}
          >
            All Time
          </button>
        </div>
      </div>
      <div className="w-3/5 mt-4">
        <ul className="text-left divide-y divide-gray-300">
          {data.map((item, index) => (
            <li key={index} className="py-4 flex items-center space-x-4">
              {item.imgUrl && (
                <img
                  src={item.imgUrl}
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
