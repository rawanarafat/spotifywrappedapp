import axios from "axios";
import express from "express";
const router = express.Router();

router.get("/topTracks", async (req, res) => {
  // Check if the access_token exists in the cookies
  res.setHeader("Access-Control-Allow-Origin", "*");
  const ACCESS_TOKEN = req.cookies["access_token"];
  if (!ACCESS_TOKEN) {
    return res.status(401).json({ error: "Access token missing in cookies" });
  }

  console.log(ACCESS_TOKEN);
  const apiUrl = "https://api.spotify.com/v1/me/top/tracks";

  // Use axios.get to make the API call
  axios
    .get(apiUrl, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Network response was not ok.");
      }
      return response.data;
    })
    .then((data) => {
      // Data contains the API response
      // Access the 'items' array and retrieve the 'name' attribute from each element

      const names = data.items.map((item) => item.name);
      //console.log(names);
      res.json(names);
    })
    .catch((error) => {
      console.error("Error fetching data from server:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.get("/test", async (req, res) => {
  // Check if the access_token exists in the cookies
  res.setHeader("Access-Control-Allow-Origin", "*");
  const timeRange = req.query.time_range;
  const ACCESS_TOKEN = req.cookies["access_token"];
  if (!ACCESS_TOKEN) {
    return res.status(401).json({ error: "Access token missing in cookies" });
  }

  console.log(ACCESS_TOKEN);
  const apiUrl = `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`;

  try {
    // Use axios.get to make the API call
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Network response was not ok.");
    }

    const data = response.data;

    // Data contains the API response
    // Access the 'items' array and retrieve the 'name' attribute from each element
    const names = data.items.map((item) => item.name);
    const trackid = data.items.map((item) => item.id);


    const tracksInfo = data.items.map((item) => ({
      name: item.name,
      id: item.id,
    }));
    //console.log(tracksInfo);
    //console.log(names);
    res.json(tracksInfo);
  } catch (error) {
    console.error("Error fetching data from server:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getimg", async (req, res) => {
  const ACCESS_TOKEN = req.cookies["access_token"];
  const id = req.query.id;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/tracks/${id}`,
      {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      }
    );

  
    const trackname = response.data.name;
    let trackImg = [];
    // Now, you can loop through t;he array and get the URLs for each image size (e.g., 640x640, 300x300, etc.)
    if (response.data.album && response.data.album.images && Array.isArray(response.data.album.images)) {
      const albumImages = response.data.album.images;
      // The "images" property from the "album" object
    
      // Now, you can loop through the array and get the URLs for each image size (e.g., 640x640, 300x300, etc.)
      for (const image of albumImages) {
        //console.log("Image URL:", image.url);
        const img = image.url.split(' ');
        //console.log("split: ", img);
        trackImg.push(img);
        
      }
      //console.log("split: ", trackImg);
    } else {
      console.error("Images data not available in the JSON.");
    }

    

    const trackimginfo = {
      name: trackname,
      img: trackImg,
    }
   
    //console.log("from server side getimg: ", trackimginfo);
    res.json(trackimginfo);
  } catch (error) {
    console.error("Error fetching data from server:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/topArtists", async (req, res) => {
  // Check if the access_token exists in the cookies
  res.setHeader("Access-Control-Allow-Origin", "*");
  const timeRange = req.query.time_range;
  const ACCESS_TOKEN = req.cookies["access_token"];
  if (!ACCESS_TOKEN) {
    return res.status(401).json({ error: "Access token missing in cookies" });
  }

  console.log(ACCESS_TOKEN);
  const apiUrl = `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`;

  try {
    // Use axios.get to make the API call
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Network response was not ok.");
    }
    const data = response.data;

    const names = data.items.map((item) => item.name);
    const images = data.items.map((item) => item.images);

    const firstUrls = images.map(array => array[0].url);

    const artistsimginfo = {
      name: names,
      img: firstUrls,
    }

    //console.log(artistsimginfo);
    res.json(artistsimginfo);
  } catch (error) {
    console.error("Error fetching data from server:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { router as topRouter };
