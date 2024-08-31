import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResults: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const query = new URLSearchParams(useLocation().search).get("q") || "";

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error("Error al obtener los resultados de búsqueda.");
        }
        const data = await response.json();
        setResults(data.results); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="p-8 w-full max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Resultados de Búsqueda</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {results.length === 0 && !loading && <p>No se encontraron resultados.</p>}
      <ul>
        {results.map((result, index) => (
          <li key={index} className="mb-4">
            {/* Ajusta según la estructura de los resultados */}
            <a href={result.url} className="text-blue-600 hover:underline">
              {result.title}
            </a>
            <p className="text-gray-600">{result.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
