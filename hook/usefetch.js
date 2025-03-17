import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/${endpoint}",
    headers: {
      "x-rapidapi-key": "651c6b84d0msh41738e039a4de4dp1fe4a7jsn52bbd1d83818",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async() =>{
    setIsLoading(true);

    try{
        const response = await axios.request
        (options);
        setData(response.data.data);
        setIsLoading(false);
    }catch(error){
        setError(error);
        alert("there is an error");
    }finally{
        setIsLoading(false); 

    }
  }

  useEffect(() => {
    fetchData();

  }, []); 

  const refetch = () =>{
    setIsLoading(true);
    fetchData();
  }

  return{ data, isLoading, error, refetch};

};

export default useFetch;
