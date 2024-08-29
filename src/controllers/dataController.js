const axios = require("axios");
const redisClient = require("../services/redisService");

const fetchData = async (req, res) => {
  const cacheKey = "data";

  // Check if data is in cache
  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("data hai");
      
      return res.status(200).send({
        data: JSON.parse(cachedData),
        source: "cache",
      });
    } else {
      console.log("data nhi hai");

      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = response.data;

      await redisClient.setEx(cacheKey, 3600, JSON.stringify(data));

      // Return fresh data
      return res.status(200).send({
        data: data,
        source: "API",
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).send(error.message);
  }
};

module.exports = { fetchData };
