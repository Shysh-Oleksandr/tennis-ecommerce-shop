import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useCallback, useState } from "react";

export function useFetchData<T>(
  method: string = "GET",
  url: string,
  name: string
): [T[], boolean] {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchData() {
    console.log("fetch");
    setLoading(true);
    try {
      const response = await axios({
        method: method,
        url: url,
      });

      if (response.status === 200 || response.status === 304) {
        let data = response.data[name] as T[];

        setItems(data);
      } else {
        console.log("Can't get items");
      }
    } catch (error) {
      alert(error);
      console.log("Catch: " + error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return [items, loading];
}
