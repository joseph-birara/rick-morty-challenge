"use client";

import { useState } from "react";
import { CharacterCard } from "../components/characterCard";
import { fetchCharactersByLocation } from "../services/rickAndMorty";
import { getFunFact } from "../services/ai";

export default function Home() {
  const [location, setLocation] = useState("");
  const [characters, setCharacters] = useState<any[]>([]);
  const [searchHistory, setSearchHistory] = useState<any[][]>([]); // stores previous searches
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const chars = await fetchCharactersByLocation(location);
      if (chars.length > 0) {
        const withFacts = await Promise.all(
          chars.map(async (c: { name: string; species: string; origin: { name: string; }; }, i: number) => {
            if (i === 0) {
              const fact = await getFunFact(c.name, c.species, c.origin.name);
              return { ...c, funFact: fact };
            }
            return c;
          })
        );
        setCharacters(withFacts);

        // save to history (adds the new search result)
        setSearchHistory((prev) => [...prev, withFacts]);
      } else {
        setCharacters([]);
        setError("No characters found for this location.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Rick and Morty Explorer</h1>

      <div className="flex space-x-2 mb-6">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter a location (e.g. Earth)"
          className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white focus:outline-none"
        />
        <button
          onClick={handleSearch}
          disabled={loading || !location}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-400">{error}</p>}

      {/* Current results */}
      <h2 className="text-xl font-semibold mt-6 mb-4">Current Search</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {characters.map((c) => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </div>

      {/* History */}
      {searchHistory.length > 0 && (
        <div className="w-full max-w-5xl">
          <h2 className="text-xl font-semibold mb-4">Search History</h2>
          {searchHistory.map((search, idx) => (
            <div key={idx} className="mb-8">
              <h3 className="text-lg font-medium mb-2">Search #{idx + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {search.map((c) => (
                  <CharacterCard key={c.id + idx} character={c} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
