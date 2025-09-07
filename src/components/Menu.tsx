"use client"

import { User, Search, Home, Image, Paintbrush } from "lucide-react";

import Link from "next/link";
import { useState } from "react";


const menuItems = [
  { name: "Home", href: "/user", icon: <Home /> },
  { name: "Image Restore", href: "/user/ImageRestore", icon: <Image /> },
  { name: "Image Generation", href: "/user/ImageGeneration", icon: null}, 
  { name: "Object Removal", href: "/user/ObjectRemoval", icon: <Paintbrush /> },
  { name: "Background Removal", href: "/user/BackgroundRemoval", icon: <Paintbrush /> },
];

const MenuUser =  ({name,email,image}:{name:string,email:string,image:string}) => {
  
  const [search, setSearch] = useState("");

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col p-4 gap-8 h-screen w-72 text-white bg-gray-900 shadow-xl">
      {/* Logo */}
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-3xl text-purple-500 font-bold">Imagining</h1>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="w-full py-2 px-4 rounded-full bg-gray-800 text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <Search className="absolute right-3 top-2 text-gray-400" />
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-4 w-full">
        {filteredItems.map((item) => (
          <Link key={item.name} href={item.href} passHref>
            <a
              className="flex items-center py-3 px-4 rounded-lg text-lg text-gray-400 font-medium hover:text-purple-400 hover:bg-gray-800 transition-colors duration-200"
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </a>
          </Link>
        ))}
      </div>

      {/* User Profile */}
      <div className="flex flex-col items-center mt-8">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          {/* <Image
            src={image || undefined}
            alt="User Avatar"
            width={64}
            height={64}
            className="object-cover"
          /> */}
        </div>
        <div className="text-center mt-2">
          <h2 className="text-lg font-medium text-gray-300">{name}</h2>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default MenuUser;
