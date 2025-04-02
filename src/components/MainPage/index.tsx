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
  const [search, setSearch] = useState("");

  const fetchWardsData = async () => {
    try {
      const response = await wardAPI.getWards();
      setWards(response);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const fetchNursesData = async (query = "") => {
    try {
      const response = await nurseAPI.getNurses(query);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    fetchNursesData(value);
  };

  return (
    <main style={{ width: "100%" }}>
      <input
        type="text"
        placeholder="Search by name or ward"
        value={search}
        onChange={handleSearchChange}
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "300px" }}
      />
      <NurseForm wards={wards} refreshNurses={fetchNursesData} />
      <NurseTable
        nurses={nurses}
        refreshNurses={fetchNursesData}
        wards={wards}
      />
    </main>
  );
};

export default MainPage;
