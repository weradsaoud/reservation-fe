import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Pathes from "../../router/pathes";
import { ActiveNavBarLink, ActiveNavMenuLink, InActiveNavBarLink, InActiveNavMenuLink } from "../../styles/styles";
import { isAuthenticated } from "../../services/authService";
import {logOut} from "../../services/authService";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const _logOut = async () => {
        await logOut();
        navigate(Pathes.logInPath);
    }

    return (
        <nav className="bg-gray-800 bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img
                                className="h-12 w-12 rounded-full"
                                src="/logo.png"
                                alt="Logo"
                            />
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {isAuthenticated() ? <NavLink
                                    to={Pathes.homePath}
                                    className={(location.pathname === Pathes.homePath) ? ActiveNavBarLink : InActiveNavBarLink}
                                >
                                    Home
                                </NavLink> : null}
                                {isAuthenticated() ? <button
                                    onClick={_logOut}
                                    className={InActiveNavBarLink}
                                >
                                    Logout
                                </button> : null}
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen ? (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink
                            to={Pathes.homePath}
                            className={(location.pathname === Pathes.homePath) ? ActiveNavMenuLink : InActiveNavMenuLink}
                        >
                            Movies
                        </NavLink>
                        <NavLink
                            to={Pathes.favoritesPath}
                            className={(location.pathname === Pathes.favoritesPath) ? ActiveNavMenuLink : InActiveNavMenuLink}
                        >
                            Favorites
                        </NavLink>
                    </div>
                </div>
            ) : null}
        </nav>
    );
}

export default Navbar;
