import { useCallback, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../api/firebase-config";

const useFetch = (collectionName) => {
  const [isloading, setIsloading] = useState(true);
  const [data, setData] = useState([]);

  const collectionRef = collection(db, collectionName);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const fetchedData = await getDocs(collectionRef);
        if (isMounted === true) {
          setData(
            fetchedData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
          setIsloading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [collectionRef]);

  return { data, isloading };
};

export default useFetch;
