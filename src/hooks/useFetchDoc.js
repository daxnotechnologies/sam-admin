import { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../api/firebase-config";

const useFetchDoc = (collectionName, docId) => {
  const [isloading, setIsloading] = useState(true);
  const [docData, setDocData] = useState([]);

  const collectionRef = collection(db, collectionName);

  useEffect(() => {
    let isMounted = true;

    const fetchDoc = async () => {
      try {
        const fetchedDocdata = await getDoc(doc(collectionRef, docId));

        if (isMounted === true) {
          setDocData(fetchedDocdata.data());
          setIsloading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDoc();

    return () => {
      isMounted = false;
    };
  }, [collectionRef, docId]);

  return { docData, isloading };
};

export default useFetchDoc;
