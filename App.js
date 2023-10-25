import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import About from './components/About';
import Admin from './components/Admin';
import Athletics from './components/Athletics';
import Badminton from './components/Badminton';
import TableTennis from './components/TableTennis';
import Home from './components/Home';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(loggedIn);

  // Function to simulate a login action
  const handleLogin = () => {
    setLoggedIn(true);
    setOpen(true);
  };

  // Function to simulate a logout action
  const handleLogout = () => {
    setLoggedIn(false);
    setOpen(false);
  };

  const Menus = [
    { title: "Athletics", path: "/athletics" },
    { title: "Badminton", path: "/badminton" },
    { title: "Table Tennis", path: "/table-tennis" },
    { title: "About Wellplayed", path: "/about" },
    { title: "Admin", path: "/admin" },
    { title: "Sign Out", onClick: handleLogout },
  ];

  return (
    <Router>
      <div className={`min-h-screen bg-blue-500 relative ${open ? "ml-72" : "ml-20"}`}>
        {loggedIn && (
          <nav className="bg-dark-purple p-5 absolute top-0 left-0 h-full transition-transform duration-300">
            {/* Navigation sidebar content */}
            <img
              src="./src/assets/control.png"
              className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${!open && "rotate-180"}`}
              onClick={() => setOpen(!open)}
            />
            <div className="flex gap-x-4 items-center">
              <img
                src="./src/assets/logo.png"
                className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
              />
              <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>
                Your Logo
              </h1>
            </div>
            <ul className="pt-6">
              {Menus.map((menu, index) => (
                <li
                  key={index}
                  className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white  text-sm items-center gap-x-4 ${
                    menu.onClick ? "cursor-pointer" : ""
                  } ${menu.path === window.location.pathname ? "bg-blue-500" : ""} ${
                    index === 0 && "bg-light-white"
                  }`}
                  onClick={menu.onClick}
                >
                  {menu.path ? (
                    <Link to={menu.path}>{menu.title}</Link>
                  ) : (
                    <span className={`${!open && "hidden"} origin-left duration-200`}>{menu.title}</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
        
        {/* Routes and content */}
        <Routes>
          {loggedIn ? (
            <>
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/athletics" element={<Athletics />} />
              <Route path="/badminton" element={<Badminton />} />
              <Route path="/table-tennis" element={<TableTennis />} />
            </>
          ) : (
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          )}
          <Route
            path="/"
            element={
              loggedIn ? (
                <Home onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
