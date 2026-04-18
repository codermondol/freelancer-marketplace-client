import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const NavBar = () => {
  
  const {user, signOutUser} =use(AuthContext);

  const handleSignOut = () => {
    signOutUser()
    .then()
    .catch()
  }

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/job'>Job</NavLink></li>
        {
          user && <>
            <li><NavLink to='/myaddedjobs'>My Added Jobs</NavLink></li>
            <li><NavLink to='/myaccepttasks'>My Accepted Tasks</NavLink></li>
          </>
        }
        <li><NavLink to='/about'>About</NavLink></li>
        <li><NavLink to='/contact'>Contact</NavLink></li>
    </>

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar w-10/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to='/' className="text-2xl">Freelancer<span>Hub</span></Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end flex gap-3">
          {
            user ? <><Link to='/login' onClick={handleSignOut} className="btn btn-primary py-2 px-8">Sign Out</Link></> : <><Link to='/login' className="py-2 px-8">Login</Link>
          <Link to='/register' className="btn btn-primary py-2 px-8">Join</Link></>
          }
        </div>
      </div>
    </div>
  );
};

export default NavBar;
