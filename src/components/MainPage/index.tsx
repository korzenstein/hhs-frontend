"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

const MainPage = () => {
  const [test, setTest] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/");
        console.log(res);
        setTest(res.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <h3>{test}</h3>
    </main>
  );
};

export default MainPage;
