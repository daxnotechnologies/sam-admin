import { useCallback, useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../api/firebase-config";

const useFetch = (collectionName, rerender) => {
  const [isloading, setIsloading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState([]);
  const collectionRef = collection(db, collectionName);

  const fetchData = useCallback(async () => {
    try {
      const fetchedData = await getDocs(collectionRef);
      setData(fetchedData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsloading(false);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      alert(error);
    }
  }, [collectionRef]);

  useEffect(() => {
    fetchData();
  }, [fetchData, rerender]);
  // console.log(data);

  return { data, isloading, errorMessage };
};

export default useFetch;
