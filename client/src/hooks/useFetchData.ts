import axios from "axios";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import { useEffect, useState } from "react";

export function useFetchData<T>(
  method: string = "GET",
  url: string,
  name: string
): [T[], Dispatch<SetStateAction<T[]>>] {
  const [items, setItems] = useState<T[]>([]);

  async function fetchData() {
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
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return [items, setItems];
}
