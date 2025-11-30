import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCheckLoggedInQuery } from '../../auth/authApiSlice';
import burgermenu from '../assets/hamburger-menu-svgrepo-com.svg';
import Logo from './Header/Logo';
import DesktopNav from './Header/DesktopNav';
import DesktopSearch from './Header/DesktopSearch';
import MobileSearch from './Header/MobileSearch';
import CartIcon from './Header/CartIcon';
import MobileSidebar from './Header/MobileSidebar';
import { useSearch } from './Header/useSearch';

export default function Header() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  useCheckLoggedInQuery();
  const { items: products } = useSelector((state) => state.product);
  
  const {
    searchQuery,
    showResults,
    filteredData,
    handleSearchChange,
    resetSearch,
    closeResults
  } = useSearch(products || []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const toggleSearching = () => {
    if (isMobile) {
      setSearching(prev => !prev);
      if (searching) {
        resetSearch();
      }
    }
  };

  const handleSearchItemClick = (itemId) => {
    navigate(`/${itemId}`);
    resetSearch();
    setSearching(false);
  };

  return (
    <>
      <div className='Header'>
        <img id="burger" src={burgermenu} alt="menu" onClick={toggleSidebar} />
        <Logo hidden={searching} />

        {!isMobile && <DesktopNav />}

        <div className='Controllers'>
          {(!searching || !isMobile) && (
            <DesktopSearch
              searchQuery={searchQuery}
              showResults={showResults}
              filteredData={filteredData}
              onSearchChange={handleSearchChange}
              onItemClick={handleSearchItemClick}
              onCloseResults={closeResults}
              onToggleMobileSearch={isMobile ? setSearching : null}
              searching={searching}
            />
          )}

          <MobileSearch
            isOpen={isMobile && searching}
            showResults={showResults}
            searchQuery={searchQuery}
            filteredData={filteredData}
            onSearchChange={handleSearchChange}
            onItemClick={handleSearchItemClick}
            onClose={() => {
              toggleSearching();
              resetSearch();
            }}
          />

          {!searching && <CartIcon />}
        </div>
      </div>

      <MobileSidebar
        isOpen={sidebarOpen}
        onClose={toggleSidebar}
      />
    </>
  );
}
