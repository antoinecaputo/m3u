"use client";

import {useCallback, useMemo, useState} from 'react';
import useSWR from 'swr';
import {getCommand} from "@/services/player";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const {data, error} = useSWR('/api/categories', fetcher);

  const [search, setSearch] = useState('');

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((category) => category.category_name.toLowerCase().includes(search.toLowerCase()));
  }, [data, search]);


  if (error) return <div>Failed to load categories</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded p-2 m-2 text-gray-950"
      />

      <div className="flex flex-col">
        {filteredData.map((category) => (
          <div key={category.category_id} className="flex flex-row justify-between bg-gray-100 p-2 m-2 w-1/5 rounded">
            <p className="text-gray-950">{category.category_name}</p>

            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={!category.ignored} className="form-checkbox h-5 w-5 text-gray-600">
              </input>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
