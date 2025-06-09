import React from "react";
import { Link } from "react-router-dom";

export const SidebarItem = ({ item }) => {
  const { label, href, icon: Icon, isActive } = item;
  return (
    <>
      {isActive ? (
        <div
          className={`rounded-full bg-[linear-gradient(90deg,#F3B34E,#FFD272,#59A4C0)] ${
            isActive ? "p-[2px]" : ""
          }`}
        >
          <Link
            to={href}
            key={label}
            className="flex w-full justify-start items-center gap-3 px-4 py-2 text-sm font-medium rounded-full text-black bg-white"
          >
            <Icon className="w-5 h-5" color="#000000" />
            {label}
          </Link>
        </div>
      ) : (
        <Link
          to={href}
          key={label}
          className="flex w-full justify-start items-center gap-3 px-4 py-2 text-sm font-medium rounded-md text-[#676767]"
        >
          <Icon className="w-5 h-5" color="#676767" />
          {label}
        </Link>
      )}
    </>
  );
};
