import { useState, useEffect, useRef } from 'react';

export function useSearch(products, debounceDelay = 500) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const timeoutRef = useRef(null);

  const filterData = (query) => {
    if (!query.trim()) return [];
    return products.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  const debouncedSearch = (value) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setSearchQuery(value);
      setShowResults(value.trim() !== '');
    }, debounceDelay);
  };

  const handleSearchChange = (value) => {
    setShowResults(false);
    debouncedSearch(value);
  };

  const resetSearch = () => {
    setSearchQuery('');
    setShowResults(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const closeResults = () => {
    setShowResults(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    searchQuery,
    showResults,
    filteredData: filterData(searchQuery),
    handleSearchChange,
    resetSearch,
    closeResults
  };
}
