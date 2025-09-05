"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Adjust path as needed
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Adjust path as needed
import { Button } from "@/components/ui/button"; // Adjust path as needed

const UserProfile = ({ name, email,iamge }: { name: string; email: string; iamge: string }) => {


  


 

    return (
      <div className="p-4 bg-gray-100 bottom-0">
        <div className="flex items-center">
          {" "}
          <Avatar className="h-8 w-8">
            <AvatarImage src={iamge || undefined} alt="User Avatar" />
            <AvatarFallback>{name ? name.charAt(0) : "U"}</AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <p className="text-sm font-medium text-black">{name || "User"}</p>
            <p className="text-xs text-gray-500">{email || "No Email"}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => signOut()}
          className="w-full mt-4"

        >
          Sign Out
        </Button>
      </div>
    );
  


};

export default UserProfile;
