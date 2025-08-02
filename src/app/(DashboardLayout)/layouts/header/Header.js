// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import {
//   Navbar,
//   Collapse,
//   Nav,
//   NavItem,
//   NavbarBrand,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Dropdown,
//   Button,
// } from 'reactstrap';

// import LogoWhite from 'public/images/logos/xtremelogowhite.svg';
// import user1 from 'public/images/users/user1.jpg';

// const Header = ({ showMobmenu }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const router = useRouter();

//   const toggle = () => setDropdownOpen(!dropdownOpen);
//   const handleToggle = () => setIsOpen(!isOpen);

//   return (
//     <Navbar color="primary" dark expand="md">
//       <div className="d-flex align-items-center">
//         <NavbarBrand href="/" className="d-lg-none">
//           <Image src={LogoWhite} alt="logo" />
//         </NavbarBrand>
//         <Button color="primary" className="d-lg-none" onClick={showMobmenu}>
//           <i className="bi bi-list"></i>
//         </Button>
//       </div>

//       <div className="hstack gap-2">
//         <Button
//           color="primary"
//           size="sm"
//           className="d-sm-block d-md-none"
//           onClick={handleToggle}
//         >
//           <i className={`bi ${isOpen ? 'bi-x' : 'bi-three-dots-vertical'}`}></i>
//         </Button>
//       </div>

//       <Collapse navbar isOpen={isOpen}>
//         <Nav className="me-auto" navbar>
//           <NavItem>
//             <Link href="/" className="nav-link">
//               Starter
//             </Link>
//           </NavItem>
//           <NavItem>
//             <Link href="/about" className="nav-link">
//               About
//             </Link>
//           </NavItem>
//           <UncontrolledDropdown inNavbar nav>
//             <DropdownToggle nav caret>
//               Menu
//             </DropdownToggle>
//             <DropdownMenu end>
//               <DropdownItem>Option 1</DropdownItem>
//               <DropdownItem>Option 2</DropdownItem>
//               <DropdownItem divider />
//               <DropdownItem>Reset</DropdownItem>
//             </DropdownMenu>
//           </UncontrolledDropdown>
//         </Nav>

//         <Dropdown isOpen={dropdownOpen} toggle={toggle}>
//           <DropdownToggle color="primary">
//             <div style={{ lineHeight: '0px' }}>
//               <Image
//                 src={user1}
//                 alt="profile"
//                 className="rounded-circle"
//                 width="30"
//                 height="30"
//               />
//             </div>
//           </DropdownToggle>
//           <DropdownMenu end>
//             <DropdownItem header>Info</DropdownItem>
//             <DropdownItem onClick={() => router.push('./MyAccount')}>
//               My Account
//             </DropdownItem>
//             <DropdownItem onClick={() => router.push('./EditProfile')}>
//               Edit Profile
//             </DropdownItem>
//             <DropdownItem divider />
//             <DropdownItem>My Balance</DropdownItem>
//             <DropdownItem>Inbox</DropdownItem>
//             <DropdownItem onClick={() => router.push('/login')}>
//               Logout
//             </DropdownItem>
//           </DropdownMenu>
//         </Dropdown>
//       </Collapse>
//     </Navbar>
//   );
// };

// export default Header;








'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
  Input,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  ListGroup,
  ListGroupItem,
  Spinner,
  Alert
} from 'reactstrap';

import LogoWhite from 'public/images/logos/xtremelogowhite.svg';
import user1 from 'public/images/users/user1.jpg';

const Header = ({ showMobmenu }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoryCanvasOpen, setCategoryCanvasOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [categoryStack, setCategoryStack] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const searchTimeoutRef = useRef();
  const searchResultsRef = useRef(null);

  // API Configuration
  const API_BASE_URL = 'http://localhost:9000/api/v1';

  // Check mobile view on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch top level categories when canvas opens
  useEffect(() => {
    if (categoryCanvasOpen && currentCategories.length === 0) {
      fetchTopLevelCategories();
    }
  }, [categoryCanvasOpen]);

  // Search handler with debounce and immediate results
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchCategories(searchQuery);
    }, 200);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const toggle = () => setDropdownOpen(!dropdownOpen);
  const handleToggle = () => setIsOpen(!isOpen);
  const toggleCategoryCanvas = () => {
    setError(null);
    setCategoryCanvasOpen(!categoryCanvasOpen);
  };

  const fetchAPI = async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  };

  const fetchTopLevelCategories = async () => {
    setIsLoadingCategories(true);
    setError(null);
    try {
      const data = await fetchAPI('/top-level');
      setCurrentCategories(data);
      setCategoryStack([]);
      setCurrentPath([]);
    } catch (err) {
      setError('Failed to load categories. Please try again.');
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const fetchChildCategories = async (categoryId) => {
    setIsLoadingCategories(true);
    try {
      return await fetchAPI(`/${categoryId}/children`);
    } catch (err) {
      setError('Failed to load subcategories. Please try again.');
      return [];
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const searchCategories = async (query) => {
    try {
      const data = await fetchAPI(`/search?query=${encodeURIComponent(query)}`);
      // Sort by relevance - assuming API returns best matches first
      setSearchResults(data);
      // Scroll to top of results
      if (searchResultsRef.current) {
        searchResultsRef.current.scrollTop = 0;
      }
    } catch (err) {
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCategoryClick = async (category) => {
    try {
      if (category.has_children) {
        const children = await fetchChildCategories(category.id);
        setCategoryStack([...categoryStack, currentCategories]);
        setCurrentCategories(children);
        setCurrentPath([...currentPath, category]);
      } else {
        router.push(`/${category.slug}`);
        setCategoryCanvasOpen(false);
      }
    } catch (err) {
      console.error('Error handling category:', err);
    }
  };

  const navigateBack = () => {
    if (categoryStack.length > 0) {
      const prevCategories = categoryStack[categoryStack.length - 1];
      setCurrentCategories(prevCategories);
      setCategoryStack(categoryStack.slice(0, -1));
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  const resetCategoryNavigation = () => {
    setCurrentCategories([]);
    setCategoryStack([]);
    setCurrentPath([]);
    setError(null);
  };

  return (
    <>
      <Navbar color="primary" dark expand="md" className="px-3">
        <div className="d-flex align-items-center">
          {!isMobile && (
            <Button 
              color="primary" 
              className="me-2" 
              onClick={toggleCategoryCanvas}
            >
              <i className="bi bi-list"></i> Categories
            </Button>
          )}
          
          <NavbarBrand href="/" className="d-lg-none">
            <Image 
              src={LogoWhite} 
              alt="logo" 
              width={120}
              height={40}
              priority
            />
          </NavbarBrand>
          
          <Button 
            color="primary" 
            className="d-lg-none ms-2" 
            onClick={showMobmenu}
          >
            <i className="bi bi-list"></i>
          </Button>
        </div>

        {/* Enhanced Search Bar */}
        <div className={`mx-2 mx-lg-3 flex-grow-1 ${isMobile ? 'order-last mt-2' : ''}`} 
             style={{ maxWidth: isMobile ? '100%' : '600px' }}>
          <div className="position-relative">
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // Clear results if query is empty
                if (e.target.value.trim() === '') {
                  setSearchResults([]);
                }
              }}
              className="ps-5"
            />
            <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3"></i>
            
            {/* Search Results Dropdown with Limited Height */}
            {searchResults.length > 0 && (
              <div 
                ref={searchResultsRef}
                className="position-absolute w-100 mt-1 z-3 bg-white rounded shadow-lg"
                style={{
                  maxHeight: '50vh',
                  overflowY: 'auto',
                  boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)'
                }}
              >
                <ListGroup flush>
                  {searchResults.map((result, index) => (
                    <ListGroupItem 
                      key={`${result.id}-${index}`}
                      action 
                      onClick={() => {
                        router.push(`/${result.slug}`);
                        setSearchQuery('');
                        setSearchResults([]);
                      }}
                      className="d-flex align-items-center py-2 px-3 border-bottom"
                    >
                      <div className="w-100">
                        <div className="fw-bold text-truncate">{result.name}</div>
                        <small className="text-muted text-truncate d-block">{result.path}</small>
                      </div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </div>
            )}
            {isSearching && (
              <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                <Spinner size="sm" color="primary" />
              </div>
            )}
          </div>
        </div>

        <div className="d-flex align-items-center">
          {isMobile && (
            <Button
              color="primary"
              size="sm"
              className="me-2"
              onClick={handleToggle}
            >
              <i className={`bi ${isOpen ? 'bi-x' : 'bi-three-dots-vertical'}`}></i>
            </Button>
          )}

          <Collapse navbar isOpen={isOpen} className="justify-content-end">
            <Nav navbar className="align-items-center">
              <NavItem className="mx-1">
                <Link href="/" className="nav-link">
                  Starter
                </Link>
              </NavItem>
              <NavItem className="mx-1">
                <Link href="/about" className="nav-link">
                  About
                </Link>
              </NavItem>
              
              <UncontrolledDropdown inNavbar nav className="mx-1">
                <DropdownToggle nav caret>
                  Menu
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <Dropdown isOpen={dropdownOpen} toggle={toggle} className="ms-2">
                <DropdownToggle color="primary" nav>
                  <div style={{ lineHeight: '0px' }}>
                    <Image
                      src={user1}
                      alt="profile"
                      className="rounded-circle"
                      width={30}
                      height={30}
                      priority
                    />
                  </div>
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem header>Info</DropdownItem>
                  <DropdownItem onClick={() => router.push('./MyAccount')}>
                    My Account
                  </DropdownItem>
                  <DropdownItem onClick={() => router.push('./EditProfile')}>
                    Edit Profile
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>My Balance</DropdownItem>
                  <DropdownItem>Inbox</DropdownItem>
                  <DropdownItem onClick={() => router.push('/login')}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </Collapse>
        </div>
      </Navbar>

      {/* Category Sidebar Offcanvas */}
      <Offcanvas 
        isOpen={categoryCanvasOpen} 
        toggle={toggleCategoryCanvas} 
        direction="start"
        onClosed={resetCategoryNavigation}
        className={isMobile ? "w-75" : "w-25"}
      >
        <OffcanvasHeader toggle={toggleCategoryCanvas} className="border-bottom">
          {currentPath.length > 0 ? (
            <div className="d-flex align-items-center">
              <Button color="link" onClick={navigateBack} className="p-0 me-2">
                <i className="bi bi-arrow-left"></i>
              </Button>
              <span className="text-truncate">{currentPath[currentPath.length - 1]?.name}</span>
            </div>
          ) : (
            'All Categories'
          )}
        </OffcanvasHeader>
        <OffcanvasBody className="p-0">
          {error && (
            <Alert 
              color="danger" 
              className="mb-3 mx-2 mt-2"
              toggle={() => setError(null)}
              fade
              timeout={200}
            >
              {error}
              <Button 
                color="link" 
                size="sm" 
                onClick={fetchTopLevelCategories}
                className="p-0 ms-2"
              >
                Retry
              </Button>
            </Alert>
          )}

          {isLoadingCategories ? (
            <div className="text-center py-4">
              <Spinner color="primary" />
              <div className="mt-2">Loading categories...</div>
            </div>
          ) : (
            <ListGroup flush>
              {currentCategories.length === 0 && !isLoadingCategories && (
                <ListGroupItem className="text-muted text-center py-4">
                  No categories found
                </ListGroupItem>
              )}
              
              {currentCategories.map((category) => (
                <ListGroupItem 
                  key={category.id} 
                  action 
                  onClick={() => handleCategoryClick(category)}
                  className="d-flex justify-content-between align-items-center py-3 px-3"
                >
                  <span className="text-truncate">{category.name}</span>
                  {category.has_children && <i className="bi bi-chevron-right ms-2"></i>}
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
};

export default Header;