import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useCallback, useState } from "react";

export function useFetchData<T>(
  method: string = "GET",
  url: string,
  name: string,
  headers?: any,
  condition: boolean = true
): [T[], boolean] {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await axios({
        method: method,
        url: url,
        headers: headers,
      });

      if (response.status === 200 || response.status === 304) {
        let data = response.data[name] as T[];

        setItems(data);
      } else {
        console.log("Can't get items");
      }
    } catch (error) {
      console.log("Catch: " + error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (condition) fetchData();
    }, [url])
  );

  return [items, loading];
}
