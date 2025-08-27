import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import burgermenu from '../assets/hamburger-menu-svgrepo-com.svg';
import searchIcon from '../assets/search-svgrepo-com.svg';
import falseIcon from "../assets/error-svgrepo-com.svg";
import cartIcon from '../assets/cart-shopping-fast-svgrepo-com.svg';
import { logOut, selectCurrentToken } from '../../auth/authSlice';
import { useCheckLoggedInQuery, useLogoutMutation } from '../../auth/authApiSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { X } from "lucide-react";
// ✅ Framer Motion
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  let navigate = useNavigate();
  let dispatch = useDispatch()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [searchfilled, setsearchfilled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  let { data: token,refetch:checkloogedin } =  useCheckLoggedInQuery()
  let localtoken=useSelector((state)=>state.auth.loogedin);

  const [logout, { isLoading, isSuccess, error:logouterror }] = useLogoutMutation();
  let searchRef = useRef();
  let mobileSearchRef = useRef();
  let searchContainerRef = useRef();

  let totalQuantity = useSelector((state) => state.cart);
  let { items: data, error, loading } = useSelector((state) => state.product);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setsearchfilled(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function filterTheData(query = searchQuery) {
    if (!query.trim()) return [];
    return data.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  function toggleSidebar() {
    setSidebarOpen(prev => !prev);
  }

  function toggleSearching() {
    if (isMobile) {
      setSearching(prev => !prev);
      if (!searching) {
        setSearchQuery('');
        setsearchfilled(false);
      }
    }
  }

  function handleSearchChange(value) {
    setSearchQuery(value);
    setsearchfilled(value.trim() !== '');
  }

  function handleSearchItemClick(itemId) {
    navigate(`/${itemId}`);
    setSearchQuery('');
    setsearchfilled(false);
    if (searchRef.current) searchRef.current.value = '';
    if (mobileSearchRef.current) mobileSearchRef.current.value = '';
    if (isMobile) setSearching(false);
  }

  return (
    <>
      <div className='Header'>
        <img id="burger" src={burgermenu} alt="menu" onClick={toggleSidebar} />
        {!searching && (
          <p style={{ cursor: 'pointer', fontSize: '24px', fontWeight: 'bold' }}
            className='Header-text'
            onClick={() => navigate('')}>
            Exclusive
          </p>
        )}

        {!isMobile && (
          <ul>
            <li><a onClick={() => navigate('/')}>Home</a></li>
            <li onClick={() => navigate('/about')}><a>About</a></li>

            {/* ✅ Animated Auth Buttons */}
            <AnimatePresence mode="wait">
              {!localtoken ? (
                <motion.li
                  key="signup"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => navigate('/auth/?mode=register')}
                >
                  <a>Sign Up</a>
                </motion.li>
              ) : (
                <motion.li
                  key="logout"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => { 
                    async function logoutHandler() {
                      let res=await logout();
                      if(isSuccess){
                        toast("You are Looged out", {
                          position: "bottom-right",
                          autoClose: 3000,
                          className:"toast-success"
                        });
                      }
                      // هنا لازم تعمل dispatch(logOut()) بدل setlocaltoken(null)
                      dispatch(logOut());
                    }
                    logoutHandler()
                  }}
                >
                  <a>Log out</a>
                </motion.li>
              )}
            </AnimatePresence>
          </ul>
        )}

        <div className='Controllers'>
          {(!searching || !isMobile) && (
            <div id="searchfield" ref={searchContainerRef}>
              {searchfilled && (
                <ul className="search-results">
                  {filterTheData().map((item, index) => (
                    <li key={item.id || index} onClick={() => handleSearchItemClick(item.id)}>
                      <img src={item.image} alt={item.title} />
                      <p>{item.title}</p>
                    </li>
                  ))}
                  {filterTheData().length === 0 && (
                    <li className="no-results">No products found</li>
                  )}
                </ul>
              )}
              {!searching && <img id="searchIcon" onClick={toggleSearching} src={searchIcon} alt="search" />}
              {!isMobile && (
                <input
                  ref={searchRef}
                  type="search"
                  placeholder='what are you looking for'
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              )}
            </div>
          )}

      <AnimatePresence>
  {isMobile && searching && (
    <motion.div
      key="mobile-search"
      ref={searchContainerRef}
      className="mobile-search"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {searchfilled && (
        <ul className="search-results">
          {filterTheData().map((item, index) => (
            <li key={item.id || index} onClick={() => handleSearchItemClick(item.id)}>
              <img src={item.image} alt={item.title} />
              <p>{item.title}</p>
            </li>
          ))}
          {filterTheData().length === 0 && (
            <li className="no-results">No products found</li>
          )}
        </ul>
      )}

      <motion.input
        ref={mobileSearchRef}
        autoFocus
        type="input"
        placeholder="what are you looking for"
        onChange={(e) => handleSearchChange(e.target.value)}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25 }}
      />

      <motion.div
  onClick={() => {
    toggleSearching();
    setsearchfilled(false);
  }}
  className="close-btn"
  initial={{ rotate: 0, opacity: 0 }}
  animate={{ rotate: 0, opacity: 1 }}
  exit={{ rotate: 0, opacity: 0 }}
  transition={{ duration: 0.3 }}
>
  <X size={20} />
</motion.div>
    </motion.div>
  )}
</AnimatePresence>


          {(!searching ) && (
            <>
              <img style={!localtoken ? {visibility:'hidden',transition:'0.3s'} : {}}  onClick={() => navigate('/cart')} src={cartIcon} alt="cart" />
              <p style={!localtoken ? {visibility:'hidden',transition:'0.3s'} : {}}    className='totalCartQuantity'>{totalQuantity.totalQuantity}</p>
            </>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <li><a onClick={() =>{ setSidebarOpen(false);navigate('/')}}>Home</a></li>
        <li onClick={() => {setSidebarOpen(false);navigate('/about')}}><a>About</a></li>

        
        <AnimatePresence mode="wait">
          {!localtoken ? (
            <motion.li
              key="signup-sidebar"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onClick={() => {setSidebarOpen(false);navigate('/auth/?mode=register')}}
            >
              <a>Sign Up</a>
            </motion.li>
          ) : (
            <motion.li
              key="logout-sidebar"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onClick={() => { 
                async function logoutHandler() {
                  let res=await logout();
                  
                    toast("You are Looged out", {
                      position: "bottom-right",
                      autoClose: 3000,
                      className:"toast-success"
                    });
                  
                  dispatch(logOut());

                }
                logoutHandler()
                setSidebarOpen(false)
              }}
            >
              <a>Log out</a>
            </motion.li>
          )}
        </AnimatePresence>
      </div>

      
      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
}
