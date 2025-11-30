import { useRef, useEffect } from 'react';
import searchIcon from '../../assets/search-svgrepo-com.svg';
import SearchResults from './SearchResults';

export default function DesktopSearch({
  searchQuery,
  showResults,
  filteredData,
  onSearchChange,
  onItemClick,
  onCloseResults,
  onToggleMobileSearch,
  searching
}) {
  const searchRef = useRef();
  const searchContainerRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        if (onCloseResults) {
          onCloseResults();
        }
      }
    }
    if (showResults) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showResults, onCloseResults]);

  return (
    <div id="searchfield" ref={searchContainerRef}>
      {showResults && (
        <ul className="search-results">
          <SearchResults
            results={filteredData}
            onItemClick={onItemClick}
            emptyMessage="No products found"
          />
        </ul>
      )}
      {onToggleMobileSearch && !searching && (
        <img
          id="searchIcon"
          onClick={() => onToggleMobileSearch(true)}
          src={searchIcon}
          alt="search"
        />
      )}
      {(!onToggleMobileSearch || searching) && (
        <input
          ref={searchRef}
          type="text"
          placeholder='what are you looking for'
          onChange={(e) => onSearchChange(e.target.value)}
        />
      )}
    </div>
  );
}
