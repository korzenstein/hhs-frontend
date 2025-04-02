"use client";

import { useEffect, useState, useMemo } from "react";
import { wardAPI } from "@/lib/wardAPI";
import { Nurse, Ward } from "@/types/types";
import { nurseAPI } from "@/lib/nurseApi";
import NurseTable from "../NurseTable";
import NurseForm from "../NurseForm";
import { customDebounce } from "@/helpers/customDebounce";
import { Main } from "./styled";

const MainPage = () => {
  const [wards, setWards] = useState<Ward[]>([]);
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);

  const fetchWardsData = async () => {
    try {
      const response = await wardAPI.getWards();
      setWards(response);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const fetchNursesData = async (query = "", pageArg = 1) => {
    try {
      const response = await nurseAPI.getNurses(query, pageArg, limit);
      setNurses(response.nurses);
      setTotal(response.total);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchWardsData();
    fetchNursesData();
  }, []);

  const debouncedFetchNursesData = useMemo(
    () => customDebounce(fetchNursesData, 350),
    []
  );

  useEffect(() => {
    debouncedFetchNursesData(search, page);
  }, [search, page, debouncedFetchNursesData]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setPage(1);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <Main>
      <h1>Nurse Management</h1>
      <NurseForm wards={wards} refreshNurses={fetchNursesData} />

      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <input
          type="text"
          placeholder="Search by name or ward"
          value={search}
          onChange={handleSearchChange}
          style={{ marginBottom: "1rem", padding: "0.5rem", width: "300px" }}
        />
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <NurseTable
        nurses={nurses}
        refreshNurses={fetchNursesData}
        wards={wards}
      />
    </Main>
  );
};

export default MainPage;
