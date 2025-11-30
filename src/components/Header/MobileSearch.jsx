import { useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SearchResults from './SearchResults';

export default function MobileSearch({
  isOpen,
  showResults,
  searchQuery,
  filteredData,
  onSearchChange,
  onItemClick,
  onClose
}) {
  const mobileSearchRef = useRef();
  const searchContainerRef = useRef();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="mobile-search"
        ref={searchContainerRef}
        className="mobile-search"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {showResults && (
          <ul className="search-results">
            <SearchResults
              results={filteredData}
              onItemClick={onItemClick}
              emptyMessage="No products found"
            />
          </ul>
        )}

        <motion.input
          ref={mobileSearchRef}
          autoFocus
          type="input"
          placeholder="what are you looking for"
          onChange={(e) => onSearchChange(e.target.value)}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25 }}
        />

        <motion.div
          onClick={onClose}
          className="close-btn"
          initial={{ rotate: 0, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <X size={20} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
