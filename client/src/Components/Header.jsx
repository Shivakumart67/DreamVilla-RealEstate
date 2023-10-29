import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Logo from "../assets/images/Logo.png";
import { Link } from "react-router-dom";

function Header() {
  const [menu, setMenu] = useState(false);
  return (
    <header className="flex justify-between bg-stone-100 shadow-md p-3 items-center mx-auto">
      <Link to="/">
        <div>
          <img src={Logo} alt="DreamVilla Logo" className="w-20 h-15" />
        </div>
      </Link>

      <ul className="flex gap-6 mr-9">
        <Link to="/">
          <li className="text-stone-700 hidden sm:block font-bold hover:underline cursor-pointer hover:text-stone-800 ">
            Home
          </li>
        </Link>
        <Link to="about">
          <li className="text-stone-700 hidden sm:block font-bold hover:underline cursor-pointer hover:text-stone-800">
            About
          </li>
        </Link>

        {/* <Link to='profile'>
        <li>
          Profile
        </li>
        </Link> */}
      </ul>
      <form className="bg-stone-200 p-2 rounded-lg border-none flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none w-24 sm:w-64"
        />
        <FaSearch className="text-stone-600 hover:cursor-pointer" />
      </form>
      <Link to="signup">
        <div className="text-stone-700 hidden sm:block mr-6 font-bold hover:underline cursor-pointer hover:text-stone-800">
          Sign Up
        </div>
      </Link>
      <div
        className="sm:hidden hamburger"
        onClick={() => {
          menu ? setMenu(false) : setMenu(true);
        }}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div
        className={
          menu
            ? "mobile-menu show-animation sm:hidden"
            : "mobile-menu hide-animation sm:hidden"
        }
      >
        {
          menu ? (
            <ul className="flex flex-col gap-5 items-center mt-6">
          <Link to="/">
            <li className="text-stone-700 font-bold cursor-pointer hover:text-stone-800" onClick={()=>setMenu(false)}>
              Home
            </li>
          </Link>
          <Link to="about">
            <li className="text-stone-700 font-bold cursor-pointer hover:text-stone-800" onClick={()=>setMenu(false)}>
              About
            </li>
          </Link>
          <Link to="signup">
          <div className="text-stone-700 font-bold cursor-pointer hover:text-stone-800" onClick={()=>setMenu(false)}>
            Sign Up
          </div>
        </Link>

          {/* <Link to='profile'>
        <li>
          Profile
        </li>
        </Link> */}
        </ul>
           ) : null
        }
      </div>
    </header>
  );
}

export default Header;
