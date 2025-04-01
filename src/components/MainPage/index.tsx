"use client";

import { useEffect, useState } from "react";
import { wardAPI } from "@/lib/wardAPI";
import { Ward } from "@/types/types";

const MainPage = () => {
  const [wards, setWards] = useState<Ward[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await wardAPI.getWards();
        setWards(response);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      {wards.map((item, index) => (
        <h3 key={item.id}>{item.name}</h3>
      ))}
    </main>
  );
};

export default MainPage;
