import { getReq } from "@/api";
import { useEffect, useState } from "react";

export const useFetch = (url, dependencies = []) => {
    // console.log(url)
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
      try {
        const res = await getReq(url);
        console.log(res);
        setData(res?.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);
//   console.log(data)
  return { data, loading, error };
};
