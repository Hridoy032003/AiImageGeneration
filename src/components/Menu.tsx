
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UserProfile from "./UserProfile";
import { getAuthSession } from "@/lib/auth";

const menuItems = [
    { name: "Home", href: "/user" },
    { name: "Image Restore", href: "/user/ImageRestore" },
    { name: "Image Generation", href: "/user/ImageGeneration" },
    {name:"Object Removal",href:"/user/ObjectRemoval"},
    {name:"Background Removal",href:"/user/BackgroundRemoval"},
    ];

const MenuUser = async() => {
    const session= await getAuthSession();
  return (
    <div className="flex flex-col p-4 gap-8 h-screen w-60  text-white justify-between">
      <div className="flex items-center flex-col gap-8">
        <a href="/" className="flex items-center">
          <h1 className="text-3xl text-purple-500 font-bold">Imagining</h1>
        </a>
        <div className="flex flex-col gap-4 w-full">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="py-3 px-4 rounded-lg text-lg text-gray-400 font-medium hover:text-purple-400 hover:bg-gray-800 transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
      <UserProfile
        name={session?.user?.name || null}
        email={session?.user?.email || null}
        image={session?.user?.image || null}
      />
    </div>
  );
}

export default MenuUser;