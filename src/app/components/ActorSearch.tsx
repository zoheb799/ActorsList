'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa'; 

const ActorSearch = ({ onSelectActor }: { onSelectActor: (actorId: string) => void }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null); 
  const [isFocused, setIsFocused] = useState(false); 

  const fetchDefaultSuggestions = async () => {
    try {
      const response = await axios.get(`/api/actors`); 
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching default actor suggestions', error);
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
        console.error('Error fetching actor suggestions', error);
      }
    } else {
      fetchDefaultSuggestions(); 
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSuggestions([]); 
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative max-w-lg mx-auto" ref={searchRef}>
      {/* Search input with icon */}
      <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm focus-within:border-blue-500">
        <FaSearch className="text-gray-500 mr-2" /> {/* Search icon */}
        <input
          type="text"
          value={query}
          onFocus={() => {
            setIsFocused(true);
            fetchDefaultSuggestions(); // Trigger default suggestions on focus
          }}
          onBlur={() => setIsFocused(false)} // When the input loses focus
          onChange={handleSearch}          // Trigger filtered suggestions on input
          placeholder="Search for an actor..."
          className="w-full p-2 text-gray-700 focus:outline-none bg-transparent"
        />
      </div>

      {/* Suggestions list */}
      {isFocused && suggestions.length > 0 && (
        <ul className="absolute left-0 w-full mt-1 bg-gray-100 border border-gray-300 rounded-lg shadow-md z-10 flex flex-wrap gap-2 p-2">
          {suggestions.map((actor) => (
            <li
              key={actor._id}
              onClick={() => onSelectActor(actor._id)}
              className="px-4 py-2 cursor-pointer bg-gray-500 text-gray-900 rounded-md transition-all duration-200 hover:bg-gray-400"
            >
              {actor.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActorSearch;
