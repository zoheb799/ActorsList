"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa"; // React Search Icon
import Image from "next/image";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedActor, setSelectedActor] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const fetchDefaultSuggestions = async () => {
    try {
      const response = await axios.get(`/api/actors`);
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching default actor suggestions", error);
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      try {
        const response = await axios.get(`/api/actors?name=${value}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching actor suggestions", error);
      }
    } else {
      fetchDefaultSuggestions();
    }
  };

  const handleSelectActor = async (actorId: string) => {
    setLoading(true);
    setSuggestions([]);
    setQuery("");
    try {
      const response = await axios.get(`/api/actors/${actorId}`);
      setSelectedActor(response.data);
    } catch (error) {
      console.error("Error fetching actor details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="actors-page mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold text-white justify-center items-center flex mb-6">
        Search for an Actor
      </h1>

      {/* Search Bar */}
      <div className="relative max-w-lg mx-auto" ref={searchRef}>
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus-within:border-blue-500">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            value={query}
            onFocus={() => {
              setIsFocused(true);
              fetchDefaultSuggestions();
            }}
            onBlur={() => setIsFocused(false)}
            onChange={handleSearch}
            placeholder="Search for an actor..."
            className="w-full p-2 text-gray-700 focus:outline-none bg-transparent"
          />
        </div>

        {suggestions.length > 0 && (
          <ul className="absolute left-0 w-full mt-1 bg-gray-100 border border-gray-300 rounded-lg shadow-md z-10 flex flex-wrap gap-2 p-2">
            {suggestions.map((actor) => (
              <li
                key={actor._id}
                onClick={() => handleSelectActor(actor._id)} // Ensure this calls the function
                className="px-4 py-2 cursor-pointer bg-gray-300 text-gray-900 rounded-md transition-all duration-200 hover:bg-gray-400"
              >
                {actor.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading ? (
        <div className="loading-screen text-center mt-6">
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : (
        selectedActor && (
          <div className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden mt-6 mx-auto">
            <Image
            height={100}
            width={100}
              src={selectedActor.pictureUrl}
              alt={selectedActor.name}
              className="w-32 h-32 object-cover rounded-full mx-auto mt-4 bg-slate-200"
            />
            <div className="p-4">
              <div className="text-xl font-semibold text-gray-900 justify-center  flex flex-col items-center gap-3">
                <h3> Name : {selectedActor.name}</h3>
              <p className="text-gray-700 mt-1">Age: {selectedActor.age}</p>

              </div>
              <p className="text-gray-600 mt-2 text-sm">{selectedActor.bio}</p>
            </div>
          </div>

          
        )
      )}
    </div>
  );
};

export default HomePage;
