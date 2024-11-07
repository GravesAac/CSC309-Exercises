import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";

export default function Home({ initialFilters }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false); // To track client-side hydration

  // Use initial filters from server-side or default values if not provided
  const [year, setYear] = useState(initialFilters.year || "2024");
  const [province, setProvince] = useState(initialFilters.province || "All");
  const [search, setSearch] = useState(initialFilters.search || "");
  const [currentPage, setCurrentPage] = useState(parseInt(initialFilters.page) || 1);
  const [holidays, setHolidays] = useState([]);
  const [filteredHolidays, setFilteredHolidays] = useState([]);

  const ITEMS_PER_PAGE = 10;

  // Wait until the client has loaded to access router.query fully
  useEffect(() => {
    if (router.isReady) {
      setIsClient(true); // Ensure client-side rendering
    }
  }, [router.isReady]);

  // Update the URL with current filter states whenever they change (client-side only)
  useEffect(() => {
    if (isClient) {
      router.push(
        {
          pathname: router.pathname,
          query: { year, province, search, page: currentPage },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [year, province, search, currentPage, isClient]);

  // Fetch holidays based on the year filter
  const fetchHolidays = async (selectedYear) => {
    const response = await fetch(`https://canada-holidays.ca/api/v1/holidays?year=${selectedYear}`);
    const data = await response.json();
    setHolidays(data.holidays);
  };

  useEffect(() => {
    fetchHolidays(year);
  }, [year]);

  // Filter and search holidays based on selected filters and search term
  useEffect(() => {
    const filterByProvince = (holiday) =>
      province === "All" || holiday.federal || holiday.provinces.some((pr) => pr.id === province);

    const filterBySearch = (holiday) =>
      holiday.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      holiday.nameFr.toLowerCase().includes(search.toLowerCase());

    const filtered = holidays.filter((holiday) => filterByProvince(holiday) && filterBySearch(holiday));
    setFilteredHolidays(filtered);
  }, [holidays, province, search]);

  // Paginate the filtered holidays
  const paginatedHolidays = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredHolidays.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredHolidays, currentPage]);

  // Handlers for filter and pagination changes
  const handleYearChange = (e) => {
    setYear(e.target.value);
    setCurrentPage(1);
  };

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredHolidays.length / ITEMS_PER_PAGE)));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div>
      <style jsx>{`
        * {
          font-family: "Arial";
        }
        h1 {
          text-align: center;
          color: #333;
          margin-bottom: 20px;
        }
        .controls {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .controls select,
        .controls input {
          padding: 8px;
          font-size: 16px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th,
        td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        tr:hover {
          background-color: #f5f5f5;
        }
        th {
          background-color: #4caf50;
          color: white;
        }
        .pagination {
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        .pagination button {
          padding: 8px 12px;
          font-size: 16px;
        }
      `}</style>

      <h1>Canada Holidays</h1>

      <div className="controls">
        <div>
          <label htmlFor="year-filter">Year:</label>
          <select id="year-filter" value={year} onChange={handleYearChange}>
            {Array.from({ length: 11 }, (_, i) => 2020 + i).map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="province-filter">Province:</label>
          <select id="province-filter" value={province} onChange={handleProvinceChange}>
            <option value="All">All</option>
            <option value="AB">AB</option>
            <option value="BC">BC</option>
            <option value="MB">MB</option>
            <option value="NB">NB</option>
            <option value="NL">NL</option>
            <option value="NS">NS</option>
            <option value="NT">NT</option>
            <option value="NU">NU</option>
            <option value="ON">ON</option>
            <option value="PE">PE</option>
            <option value="QC">QC</option>
            <option value="SK">SK</option>
            <option value="YT">YT</option>
          </select>
        </div>

        <div>
          <label htmlFor="holiday-search">Search:</label>
          <input
            type="text"
            id="holiday-search"
            placeholder="Search by name"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <table id="holidays-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Name (FR)</th>
            <th>Province(s)</th>
          </tr>
        </thead>
        <tbody>
          {paginatedHolidays.map((holiday) => (
            <tr key={holiday.id}>
              <td>{holiday.date}</td>
              <td>{holiday.nameEn}</td>
              <td>{holiday.nameFr}</td>
              <td>{holiday.federal ? "Federal" : holiday.provinces.map((pr) => pr.id).join(" ")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button id="prev-page" onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          id="next-page"
          onClick={nextPage}
          disabled={currentPage === Math.ceil(filteredHolidays.length / ITEMS_PER_PAGE)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

// Server-side function to get initial query parameters
export async function getServerSideProps(context) {
  return {
    props: {
      initialFilters: context.query, // Pass initial query parameters to the component as props
    },
  };
}
