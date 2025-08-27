"use client";
import { useState } from "react";
import { useUser } from "./UserContext";
import EducifyLogo from "@/public/Educify-Logo.png";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import {
  Search,
  X,
  CircleQuestionMark,
  Bell,
  CircleUserRound,
} from "lucide-react";

interface User {
  name: string;
  email: string;
  role: string;
}

export default function NavSectionOne() {
  const { user, setUser } = useUser()
  const [notifications, setNotifications] = useState(23);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [query, setSearchQuery] = useState("");
  //   const router = useRouter()

  const users: User[] = [
    {
      name: "John Doe",
      email: "johndoe@example.com",
      role: "Tutor",
    },
    {
      name: "Jane Doe",
      email: "janedoe@example.com",
      role: "Tutor",
    },
    {
      name: "Peter Doe",
      email: "peterdoe@example.com",
      role: "Student",
    },
  ];

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submission (Enter key or button click)
  const handleSearchSubmit = () => {
    if (!query.trim()) return;
    // router.push(`/search/${query}`);
    setSearchQuery("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchSubmit();
    }
  };

  const handleUserSelect = (selectedUser: User) => {
    setUser(selectedUser);
    setShowUserDropdown(false);
  };

  return (
    <nav className="w-full mx-auto flex items-center justify-between py-4 bg-white border-2 border-gray-200">
      {/* Logo */}
      <div className="w-36">
        <Image src={EducifyLogo} alt="Educify Logo" className="w-full h-auto" />
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for anything"
            value={query}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className="w-full py-2 px-4 rounded-full bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-customRed"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={handleSearchSubmit}
            disabled={!query}
            aria-label="Search"
          >
            <Search className="h-4 w-4 text-gray-500 dark:text-gray-300 cursor-pointer" />
          </button>
          {query && (
            <button
              type="button"
              title="clear"
              className="absolute right-8 top-1/2 transform -translate-y-1/2"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4 text-gray-500 dark:text-gray-300 cursor-pointer" />
            </button>
          )}
        </div>
      </div>

      <button
        title="question"
        type="button"
        className="bg-gray-200 rounded-full p-2 cursor-pointer"
        onClick={()=> {window.location.reload()}}
      >
        <CircleQuestionMark />
      </button>

      <button
        type="button"
        className="relative bg-gray-200 rounded-full p-2 ml-4 cursor-pointer"
        onClick={()=> {window.location.reload()}}
      >
        {notifications > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs">
            {notifications}
          </span>
        )}
        <Bell />
      </button>

      <div className="relative ml-4">
        <button
          type="button"
          onClick={() => setShowUserDropdown(!showUserDropdown)}
          className="flex items-center gap-4 bg-gray-200 p-2 rounded-full cursor-pointer"
        >
          {user ? (
            <>
                <div className="text-left">
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                <CircleUserRound />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <p>Select User</p>
              <CircleUserRound />
            </div>
          )}
        </button>
        {showUserDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border">
            {users.map((u) => (
              <button
                key={u.email}
                type="button"
                onClick={() => handleUserSelect(u)}
                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {u.name} <span className="text-gray-500">({u.role})</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
