import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../constants";
import Logo from "../assets/icons/logo.svg";
import { X } from "lucide-react";
import { useScreenSize } from "@/hooks/useScreenSize";
import { SidebarItem } from "./sidebar/SidebarItem";
import Sidebar from "./sidebar/Sidebar";

const Header = () => {
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isMediumScreen } = useScreenSize();

  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname.startsWith("/auth/");

  useEffect(() => {
    const onScroll = () => {
      setIsScrolledPast(window.scrollY > 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleGetStarted = () => {
    navigate("/auth/signup");
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolledPast ? "bg-white/20 backdrop-blur-xl shadow-lg" : "bg-white"
        }`}
      >
        <nav className="z-50 py-6 px-4 md:px-6 lg:px-10 w-full flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src={Logo}
              alt="logo"
              className="cursor-pointer md:cursor-default"
              onClick={() => {
                if (isMediumScreen) setIsMobileMenuOpen(true);
              }}
            />
            <h1
              className="text-2xl hidden md:block font-medium anonymous-font text-logo"
              to="/"
            >
              <span className="font-semibold">C</span>areer
              <span className="font-semibold">M</span>entor
            </h1>
          </div>

          {/* Desktop Navigation */}
          {/* don't show it on auth pages */}
          {!isAuthPage && (
            <>
              <div className="hidden md:flex items-center space-x-6 text-custom-gray-dark">
                {navLinks.map((link, index) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={index}
                      to={link.href}
                      className={`relative text-custom-gray-dark transition-colors ${
                        isActive
                          ? "after:content-[''] after:absolute after:left-0 after:w-full after:h-[1px] after:bg-custom-gray-dark after:-bottom-1 after:translate-y-[3px]"
                          : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <button
                onClick={handleGetStarted}
                className="border border-custom-black-dark text-sm md:text-base font-normal rounded-full text-custom-black-dark anonymous-font px-3 py-1 md:px-6 md:py-2"
              >
                Get Started
              </button>
            </>
          )}
        </nav>
        <hr className="bg-custom-gray-dark w-11/12 block md:hidden mx-auto" />
      </header>

      {/* Mobile Sidebar Menu */}
      {/* TODO : Add animation and reuse the sidebar here */}
      {isMobileMenuOpen && (
        <MobileMenu
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isAuthPage={isAuthPage}
        />
      )}
    </>
  );
};

const MobileMenu = ({ setIsMobileMenuOpen, isAuthPage }) => {
  return (
    <>
      {!isAuthPage && (
        <div className="fixed inset-0 z-50 md:hidden flex transition-transform">
          {/* Sidebar Panel */}
          <div className="w-64 h-full bg-white shadow-lg p-6 flex flex-col gap-8 z-50">
            <div className="flex items-center justify-between">
              <div className="text-base font-normal flex items-center gap-2">
                <img src={Logo} alt="logo" className="w-6 h-6" />
                Career Mentor
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="self-end text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* items */}
            <nav className="flex flex-col gap-4 text-custom-gray-dark font-medium">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <SidebarItem key={item.label} item={{ ...item, isActive }} />
                );
              })}
            </nav>
          </div>

          {/* Overlay */}
          <div
            className="flex-1 bg-black/30 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      )}
    </>
  );
};

export default Header;
