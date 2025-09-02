"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  Cloud, // Correctly using the Cloud icon
} from "lucide-react";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    // --- FIX: Restored the redirectUrl to ensure correct sign-out flow ---
    await signOut({ redirectUrl: "/home" });
  };

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-gray-900 shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* --- FIX: Updated logo to match sign-in page style --- */}
        <div className="flex items-center justify-center py-6 border-b border-gray-800">
          <div className="bg-indigo-600 p-3 rounded-full">
            <Cloud className="h-8 w-8 text-white" />
          </div>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition ${
                    pathname === item.href
                      ? "bg-indigo-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sign Out Button */}
        {user && (
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={handleSignOut}
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-red-500 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
            >
              <LogOutIcon className="w-5 h-5 mr-2" />
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between w-full h-16 px-4 bg-gray-900 border-b border-gray-800 shadow-md lg:px-8">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md lg:hidden hover:bg-gray-800"
          >
            <MenuIcon className="w-6 h-6 text-gray-200" />
          </button>

          {/* Logo */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <Link href="/" onClick={handleLogoClick}>
              <span className="text-xl font-bold tracking-tight cursor-pointer text-indigo-500">
                Vividly
              </span>
            </Link>
          </div>

          {/* User Info */}
          {user && (
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={user.imageUrl}
                  alt={user.username || user.emailAddresses[0].emailAddress}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="hidden text-sm truncate max-w-[150px] sm:block">
                {user.username || user.emailAddresses[0].emailAddress}
              </span>
              <button
                onClick={handleSignOut}
                className="p-2 rounded-md hover:bg-gray-800"
              >
                <LogOutIcon className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
