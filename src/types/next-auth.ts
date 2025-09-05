import { DefaultSession } from "next-auth";


declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
        credits: number;
 
    } & DefaultSession["user"]; 
  }

  interface User {
      username?: string | null;
      credits?: number | null;

  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    credits: number;
  
  }
}