import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

export const useGetData = (category) => {
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, category));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoading(false);
        setData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, [category]);

  return { data, loading };
};
