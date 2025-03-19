import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query = {}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "x-rapidapi-key": "651c6b84d0msh41738e039a4de4dp1fe4a7jsn52bbd1d83818",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.request(options);
      
      // Add this check to see what the API is returning
      console.log("API Response:", response.data);
      
      if (response.data.data) {
        setData(response.data.data);
      } else {
        setData([]);
        setError("No data found in API response");
      }
    } catch (error) {
      // More detailed error logging
      console.error("API Error:", error);
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        setError(`API Error: ${error.response.status} - ${error.response.data?.message || "Unknown error"}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
        setError("No response received from server. Check your network connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        setError(`Request failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Add endpoint and query object stringified to dependencies so it refetches when they change
  }, [endpoint, JSON.stringify(query)]);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;