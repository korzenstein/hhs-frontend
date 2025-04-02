"use client";

import { useEffect, useState } from "react";
import { wardAPI } from "@/lib/wardAPI";
import { Nurse, Ward } from "@/types/types";
import { nurseAPI } from "@/lib/nurseApi";
import NurseTable from "../NurseTable";
import NurseForm from "../NurseForm";
const MainPage = () => {
  const [wards, setWards] = useState<Ward[]>([]);
  const [nurses, setNurses] = useState<Nurse[]>([]);

  const fetchWardsData = async () => {
    try {
      const response = await wardAPI.getWards();
      setWards(response);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const fetchNursesData = async () => {
    try {
      const response = await nurseAPI.getNurses();
      console.log(response);
      setNurses(response);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchWardsData();
    fetchNursesData();
  }, []);

  return (
    <main style={{ width: "100%" }}>
      <NurseForm wards={wards} refreshNurses={fetchNursesData} />
      <NurseTable nurses={nurses} refreshNurses={fetchNursesData} />
    </main>
  );
};

export default MainPage;
